import { Request, Response, NextFunction } from "express";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: "Administrator" | "Data Analyst" | "Viewer";
}

// Dataset access levels mapping (Public vs Internal vs Restricted)
export const DATASET_ACCESS_LEVELS: Record<string, "Public" | "Internal" | "Restricted"> = {
  "ds-global-enterprise-01": "Public",
  "ds-01": "Public",
  "ds-cloud-infra-02": "Internal",
  "ds-02": "Internal",
  "ds-hft-fin-03": "Restricted",
  "ds-03": "Restricted",
};

/**
 * Extract authenticated user and assigned role from token or request headers
 */
export function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const roleHeader = req.headers["x-user-role"] as string;

  let role: "Administrator" | "Data Analyst" | "Viewer" = "Viewer";

  if (roleHeader === "Administrator" || roleHeader === "Data Analyst" || roleHeader === "Viewer") {
    role = roleHeader;
  } else if (authHeader) {
    if (authHeader.toLowerCase().includes("admin")) {
      role = "Administrator";
    } else if (authHeader.toLowerCase().includes("analyst")) {
      role = "Data Analyst";
    }
  }

  (req as any).user = {
    id: "user-session-id",
    email: `${role.toLowerCase().replace(/\s+/g, "")}@datascope.internal`,
    role,
  };

  next();
}

/**
 * Dataset-Level Permission Enforcement Middleware
 * Prevents unauthorized users from accessing sensitive datasets by manipulating query parameters
 */
export function enforceDatasetPermission(req: Request, res: Response, next: NextFunction) {
  const datasetId =
    (req.query.datasetId as string) ||
    (req.body && req.body.datasetId as string) ||
    "ds-global-enterprise-01";

  const user = (req as any).user || { role: "Viewer" };
  const accessLevel = DATASET_ACCESS_LEVELS[datasetId] || "Public";

  if (accessLevel === "Restricted" && user.role !== "Administrator") {
    return res.status(403).json({
      success: false,
      error: {
        code: "UNAUTHORIZED_DATASET_ACCESS",
        message: `Dataset '${datasetId}' has Restricted classification. Only Administrators may query this dataset.`,
        requiredRole: "Administrator",
        currentRole: user.role,
      },
    });
  }

  if (accessLevel === "Internal" && user.role === "Viewer") {
    return res.status(403).json({
      success: false,
      error: {
        code: "UNAUTHORIZED_DATASET_ACCESS",
        message: `Dataset '${datasetId}' has Internal classification. Viewers are not authorized to view internal datasets.`,
        requiredRole: "Data Analyst or Administrator",
        currentRole: user.role,
      },
    });
  }

  next();
}

/**
 * Role-Based Access Control (RBAC) Guard for sensitive endpoints
 */
export function requireRole(...allowedRoles: Array<"Administrator" | "Data Analyst" | "Viewer">) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user || { role: "Viewer" };

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: "FORBIDDEN_INSUFFICIENT_ROLE",
          message: `Insufficient permissions. This operation requires one of: [${allowedRoles.join(
            ", "
          )}]. Your current role is '${user.role}'.`,
          requiredRoles: allowedRoles,
          currentRole: user.role,
        },
      });
    }

    next();
  };
}

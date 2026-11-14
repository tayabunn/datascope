import { NextRequest, NextResponse } from "next/server";
import { getOrGenerateMockRecords } from "@/lib/mockData";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const records = getOrGenerateMockRecords(1000);
    const record = records.find((r) => r.id === id || r.recordCode === id) || records[0];

    const related = [
      {
        relationshipType: "Parent Account",
        targetRecord: {
          id: records[1]?.id || "rec-rel-1",
          recordCode: records[1]?.recordCode || "REC-000002",
          title: "Global Supply Chain Modernization",
          companyName: record.companyName,
          revenue: record.revenue * 1.5,
          status: "Active",
        },
      },
      {
        relationshipType: "Associated Contract",
        targetRecord: {
          id: records[2]?.id || "rec-rel-2",
          recordCode: records[2]?.recordCode || "REC-000003",
          title: "Tier-1 Cloud Support SLA",
          companyName: record.companyName,
          revenue: record.revenue * 0.35,
          status: "Active",
        },
      },
    ];

    const auditLogs = [
      {
        id: "audit-01",
        action: "STATUS_UPDATE",
        changedBy: "Sarah Connor (Data Analyst)",
        previousValues: { status: "Pending" },
        newValues: { status: record.status },
        timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
      },
      {
        id: "audit-02",
        action: "REVENUE_REVISION",
        changedBy: "Alex Rivera (Administrator)",
        previousValues: { revenue: record.revenue * 0.9 },
        newValues: { revenue: record.revenue },
        timestamp: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
      },
      {
        id: "audit-03",
        action: "INITIAL_INGESTION",
        changedBy: "System ERP Connector",
        previousValues: {},
        newValues: { recordCode: record.recordCode, category: record.category },
        timestamp: record.createdAt,
      },
    ];

    return NextResponse.json({
      success: true,
      data: {
        record,
        relatedRecords: related,
        auditLogs,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const records = getOrGenerateMockRecords(100);
    const record = records.find((r) => r.id === id || r.recordCode === id) || records[0];

    Object.assign(record, body, { updatedAt: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      data: record,
      message: "Record updated successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}

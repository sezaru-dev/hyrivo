export const dynamic = 'force-dynamic'
import { connectToDB } from "@/lib/backend/db"
import JobApplication from "@/models/job-application-model"
import { verifySession } from "@/lib/backend/verify-session"
import { JobApplicationType } from "@/types"
import EditJobApplicationForm from "@/components/custom/forms/EditJobApplicationForm"
import type { Metadata } from "next"

type EditApplicationPageProps = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: EditApplicationPageProps
): Promise<Metadata> {
  await connectToDB()
  const applicationDoc = await JobApplication.findById(params.id).lean() as JobApplicationType | null

  if (!applicationDoc) {
    return {
      title: "Application not found",
      description: "No job application was found with this ID.",
    }
  }

  return {
    title: `Edit Application – ${applicationDoc.jobTitle} at ${applicationDoc.companyName}`,
    description: `Update details of your application for ${applicationDoc.jobTitle} at ${applicationDoc.companyName}.`,
  }
}

const EditApplicationPage = async ({ params }: EditApplicationPageProps) => {
  // Verify session on the server
  const session = await verifySession()
  if ("status" in session) {
    // If verifySession returned a NextResponse, it means unauthorized
    // Instead of returning NextResponse (not allowed in page), show fallback UI
    return (
      <main className="p-6 md:p-8 grid place-items-center h-screen w-full">
        <h1 className="text-2xl font-medium text-red-500">
          Unauthorized
        </h1>
      </main>
    )
  }

  //  Connect to DB
  await connectToDB()

  //  Fetch job application directly on the server
  const applicationDoc = await JobApplication.findOne({
    _id: params.id,
    userEmail: session.user.email,
  }).lean()

  const application = applicationDoc
    ? (JSON.parse(JSON.stringify(applicationDoc)) as JobApplicationType)
    : null

  if (!application) {
    return (
      <main className="p-6 md:p-8 grid place-items-center h-screen w-full">
        <h1 className="text-2xl font-medium text-red-500">
          Application not found
        </h1>
      </main>
    )
  }

  return (
    <EditJobApplicationForm data={application} />
  )
}

export default EditApplicationPage

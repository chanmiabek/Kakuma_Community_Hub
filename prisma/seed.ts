// Load the generated client at runtime so this seed remains compatible with
// Prisma setups whose generated package does not expose typed named exports.
const { PrismaClient, UserRole, OpportunityType, OpportunityStatus, ApplicationStatus } = require('@prisma/client')
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean existing data
  await prisma.application.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.opportunity.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@kakumahub.org',
      password: adminPassword,
      role: UserRole.ADMIN,
      bio: 'System administrator for Kakuma Community Hub',
      location: 'Kakuma, Kenya',
      skills: ['Management', 'Leadership', 'Technology'],
      languages: ['English', 'Swahili'],
      emailVerified: new Date(),
    },
  })

  // Create moderator user
  const moderatorPassword = await bcrypt.hash('moderator123', 10)
  const moderator = await prisma.user.create({
    data: {
      name: 'Moderator User',
      email: 'moderator@kakumahub.org',
      password: moderatorPassword,
      role: UserRole.MODERATOR,
      bio: 'Community moderator',
      location: 'Kakuma, Kenya',
      skills: ['Communication', 'Community Management'],
      languages: ['English', 'Swahili', 'French'],
      emailVerified: new Date(),
    },
  })

  // Create regular users
  const regularUsers = []
  const userPassword = await bcrypt.hash('user123', 10)
  
  const userData = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Looking for opportunities in web development',
      location: 'Kakuma Camp 1',
      skills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS'],
      languages: ['English', 'Swahili'],
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      bio: 'Passionate about education and community development',
      location: 'Kakuma Camp 2',
      skills: ['Teaching', 'Project Management', 'Communication'],
      languages: ['English', 'French', 'Arabic'],
    },
    {
      name: 'Michael Johnson',
      email: 'michael@example.com',
      bio: 'Entrepreneur looking for business opportunities',
      location: 'Kakuma Camp 3',
      skills: ['Business Development', 'Marketing', 'Finance'],
      languages: ['English', 'Swahili', 'Somali'],
    },
    {
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      bio: 'Healthcare professional seeking volunteer opportunities',
      location: 'Kakuma Camp 1',
      skills: ['Nursing', 'First Aid', 'Patient Care'],
      languages: ['English', 'Amharic'],
    },
  ]

  for (const user of userData) {
    const createdUser = await prisma.user.create({
      data: {
        ...user,
        password: userPassword,
        role: UserRole.USER,
        emailVerified: new Date(),
      },
    })
    regularUsers.push(createdUser)
  }

  // Create opportunities
  const opportunitiesData = [
    {
      title: 'Web Development Instructor',
      description: 'Looking for experienced web developer to teach coding basics to youth in the community. The instructor will be responsible for developing curriculum and teaching HTML, CSS, and JavaScript.',
      type: OpportunityType.JOB,
      location: 'Kakuma Innovation Center',
      organization: 'Tech for Refugees',
      requirements: ['2+ years web development experience', 'Teaching experience preferred', 'Fluent in English'],
      benefits: ['Competitive salary', 'Flexible hours', 'Professional development'],
      deadline: new Date('2024-12-31'),
      contactEmail: 'jobs@techforrefugees.org',
      tags: ['technology', 'education', 'web development'],
    },
    {
      title: 'Nursing Assistant Training Program',
      description: 'Comprehensive training program for aspiring healthcare professionals. Includes classroom instruction and hands-on clinical experience.',
      type: OpportunityType.TRAINING,
      location: 'Kakuma Health Center',
      organization: 'International Medical Corps',
      requirements: ['High school diploma', 'Interest in healthcare', 'Commitment to 6-month program'],
      benefits: ['Certificate upon completion', 'Stipend provided', 'Job placement assistance'],
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-09-01'),
      contactEmail: 'training@imc.org',
      tags: ['healthcare', 'training', 'certification'],
    },
    {
      title: 'Community Garden Volunteer',
      description: 'Help maintain and expand our community garden project. Volunteers will assist with planting, harvesting, and teaching sustainable agriculture practices.',
      type: OpportunityType.VOLUNTEER,
      location: 'Kakuma Community Garden',
      organization: 'Green Futures Initiative',
      requirements: ['Interest in agriculture', 'Willingness to work outdoors', 'Team player'],
      benefits: ['Fresh produce', 'Learning opportunity', 'Community service hours'],
      contactEmail: 'volunteer@greenfutures.org',
      tags: ['agriculture', 'volunteer', 'sustainability'],
    },
    {
      title: 'Small Business Startup Grant',
      description: 'Funding opportunity for aspiring entrepreneurs. Grants up to $2,500 available for innovative business ideas that benefit the community.',
      type: OpportunityType.SCHOLARSHIP,
      location: 'Kakuma Business Center',
      organization: 'Kakuma Entrepreneurship Fund',
      requirements: ['Business plan', 'Community impact statement', 'Budget proposal'],
      benefits: ['Startup funding', 'Mentorship', 'Business training'],
      deadline: new Date('2024-06-30'),
      contactEmail: 'grants@kef.org',
      tags: ['business', 'funding', 'entrepreneurship'],
    },
    {
      title: 'English Language Tutor',
      description: 'Seeking qualified English teachers to provide language instruction to adult learners. Classes held evenings and weekends.',
      type: OpportunityType.JOB,
      location: 'Kakuma Education Center',
      organization: 'Refugee Education Trust',
      requirements: ['Native or fluent English', 'TESOL certification preferred', 'Patience and cultural sensitivity'],
      benefits: ['Hourly rate', 'Teaching materials provided', 'Supportive team environment'],
      contactEmail: 'teach@ret.org',
      tags: ['education', 'language', 'teaching'],
    },
    {
      title: 'Mobile App Development Internship',
      description: '6-month internship opportunity for aspiring mobile developers. Work on real projects and learn from experienced mentors.',
      type: OpportunityType.INTERNSHIP,
      location: 'Remote',
      organization: 'Code for Africa',
      requirements: ['Basic programming knowledge', 'Interest in mobile development', 'Self-motivated'],
      benefits: ['Mentorship', 'Portfolio building', 'Potential job offer'],
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-10-01'),
      contactEmail: 'internships@codeforafrica.org',
      tags: ['technology', 'internship', 'mobile development'],
    },
  ]

  for (const opp of opportunitiesData) {
    await prisma.opportunity.create({
      data: {
        ...opp,
        createdBy: admin.id,
        status: OpportunityStatus.ACTIVE,
      },
    })
  }

  // Create some sample applications
  const opportunities = await prisma.opportunity.findMany()
  
  if (opportunities.length > 0 && regularUsers.length > 0) {
    const applications = [
      {
        opportunityId: opportunities[0].id,
        userId: regularUsers[0].id,
        status: ApplicationStatus.PENDING,
        coverLetter: 'I am very interested in this teaching position. I have 3 years of experience in web development and have previously taught coding to beginners.',
      },
      {
        opportunityId: opportunities[1].id,
        userId: regularUsers[3].id,
        status: ApplicationStatus.SHORTLISTED,
        coverLetter: 'As a healthcare professional, I would love to participate in this training program to enhance my skills and better serve our community.',
      },
      {
        opportunityId: opportunities[2].id,
        userId: regularUsers[1].id,
        status: ApplicationStatus.ACCEPTED,
        coverLetter: 'I am passionate about sustainable agriculture and would love to contribute to this community garden project.',
      },
      {
        opportunityId: opportunities[3].id,
        userId: regularUsers[2].id,
        status: ApplicationStatus.PENDING,
        coverLetter: 'I have a business plan for a mobile money transfer service that would greatly benefit our community.',
      },
    ]

    for (const app of applications) {
      await prisma.application.create({
        data: app,
      })
    }
  }

  // Create sample posts
  const postsData = [
    {
      title: 'Welcome to Kakuma Community Hub!',
      content: 'This platform is designed to connect community members with opportunities and resources. Feel free to explore and share your experiences.',
      authorId: admin.id,
      tags: ['welcome', 'community'],
    },
    {
      title: 'Free Coding Workshop This Saturday',
      content: 'Join us for a free introductory coding workshop at the Innovation Center. No experience required. Laptops will be provided.',
      authorId: moderator.id,
      tags: ['coding', 'workshop', 'technology'],
    },
    {
      title: 'Tips for Writing a Strong CV',
      content: 'Here are some tips for creating a compelling CV: 1) Keep it concise 2) Highlight your skills 3) Include volunteer experience 4) Proofread carefully',
      authorId: regularUsers[0].id,
      tags: ['career', 'tips', 'cv'],
    },
  ]

  for (const post of postsData) {
    await prisma.post.create({
      data: post,
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log('👤 Admin: admin@kakumahub.org / admin123')
  console.log('👤 Moderator: moderator@kakumahub.org / moderator123')
  console.log('👤 User: john@example.com / user123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
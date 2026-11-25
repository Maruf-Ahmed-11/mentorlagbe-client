import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

function loadMongoUri() {
  for (const envFile of [".env.local", ".env"]) {
    const fullPath = path.resolve(process.cwd(), envFile);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf8");
      const match = content.match(/^MONGODB_URI=(.+)$/m);
      if (match) {
        return match[1].trim().replace(/^["']|["']$/g, "");
      }
    }
  }
  throw new Error("MONGODB_URI not found in .env.local or .env");
}

const DEMO_USERS = [
  {
    name: "Tahmidur Rahman",
    email: "tahmidur.buet@mentorlagbe.demo",
    role: "tutor",
    plan: "pro",
    phone: "+880 1711-223344",
    bio: "B.Sc. in Mechanical Engineering, BUET. 5+ years mentoring HSC & Engineering Admission aspirants in Physics and Higher Math.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Zarin Subah",
    email: "zarin.du@mentorlagbe.demo",
    role: "tutor",
    plan: "pro",
    phone: "+880 1812-445566",
    bio: "M.Sc. in Applied Chemistry, University of Dhaka. Cambridge O/A-Level & HSC Chemistry specialist.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Nafis Chowdhury",
    email: "nafis.buet@mentorlagbe.demo",
    role: "tutor",
    plan: "pro",
    phone: "+880 1913-667788",
    bio: "Software Engineer & BUET CSE graduate. Teaching Python, C/C++, Web Development, and HSC ICT.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Farhana Akter",
    email: "farhana.ielts@mentorlagbe.demo",
    role: "tutor",
    plan: "pro",
    phone: "+880 1614-889900",
    bio: "IELTS Band 8.5 certified mentor. Specialized in Academic Writing, Speaking fluency, and O-Level English.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Tanvir Hasan",
    email: "tanvir.math@mentorlagbe.demo",
    role: "tutor",
    plan: "free",
    phone: "+880 1715-112299",
    bio: "Mathematics instructor focusing on SSC, HSC, and University Admission Calculus & Geometry.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Mahbubur Rahman",
    email: "mahbub.acct@mentorlagbe.demo",
    role: "tutor",
    plan: "pro",
    phone: "+880 1716-334455",
    bio: "BBA & MBA (IBA, DU). Helping HSC Business Studies & A-Level Accounting students master financial statements.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Ayaan Karim",
    email: "ayaan.student@mentorlagbe.demo",
    role: "student",
    plan: "pro",
    phone: "+880 1755-102030",
    bio: "HSC Science candidate preparing for BUET & Dhaka University admission.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Nusrat Jahan",
    email: "nusrat.student@mentorlagbe.demo",
    role: "student",
    plan: "free",
    phone: "+880 1855-405060",
    bio: "Cambridge A-Level student focusing on Chemistry and Mathematics.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Rafi Ahmed",
    email: "rafi.student@mentorlagbe.demo",
    role: "student",
    plan: "free",
    phone: "+880 1955-708090",
    bio: "Undergraduate CS freshman learning full-stack TypeScript & React.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
];

const DEMO_TUITIONS = [
  {
    title: "HSC Physics & BUET Admission Intensive Batch",
    subject: "Physics",
    classLevel: "HSC (Class 11-12)",
    mode: "Hybrid",
    location: "Dhanmondi, Dhaka",
    schedule: "3 days / week",
    monthlyFee: 6000,
    tutorEmail: "tahmidur.buet@mentorlagbe.demo",
    tutorName: "Tahmidur Rahman",
    bannerImage: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=1200&auto=format&fit=crop",
    description:
      "Concept-first mastery of Mechanics, Electromagnetism, Optics, and Modern Physics with weekly BUET/CKRUET admission model tests and 1-on-1 problem-solving sessions.",
  },
  {
    title: "HSC Higher Mathematics: Calculus & Vectors Mastery",
    subject: "Higher Mathematics",
    classLevel: "University Admission",
    mode: "Online",
    location: "Online / Pan-Bangladesh",
    schedule: "4 days / week",
    monthlyFee: 5000,
    tutorEmail: "tahmidur.buet@mentorlagbe.demo",
    tutorName: "Tahmidur Rahman",
    bannerImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop",
    description:
      "Complete Paper 1 & Paper 2 coverage including Differential Calculus, Integration, Conics, and Matrices with shortcut techniques for engineering admission exams.",
  },
  {
    title: "Cambridge O / A-Level Chemistry Past Paper Clinic",
    subject: "Chemistry",
    classLevel: "Cambridge O / A-Level",
    mode: "Online",
    location: "Online / Pan-Bangladesh",
    schedule: "3 days / week",
    monthlyFee: 7500,
    tutorEmail: "zarin.du@mentorlagbe.demo",
    tutorName: "Zarin Subah",
    bannerImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop",
    description:
      "Targeted CAIE Paper 1, 2 & 4 past paper drills covering Organic Mechanisms, Energetics, Electrochemistry, and Stoichiometry with examiner marking schemes.",
  },
  {
    title: "SSC & HSC Organic Chemistry Foundation",
    subject: "Chemistry",
    classLevel: "HSC (Class 11-12)",
    mode: "Offline",
    location: "Banani, Dhaka",
    schedule: "3 days / week",
    monthlyFee: 4800,
    tutorEmail: "zarin.du@mentorlagbe.demo",
    tutorName: "Zarin Subah",
    bannerImage: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1200&auto=format&fit=crop",
    description:
      "Crystal-clear breakdown of IUPAC nomenclature, reaction mechanisms, aromatic compounds, and board CQ/MCQ mastery.",
  },
  {
    title: "Full-Stack Web Development & Next.js Mentorship",
    subject: "Programming",
    classLevel: "Professional & Skills",
    mode: "Online",
    location: "Online / Remote",
    schedule: "3 days / week",
    monthlyFee: 8000,
    tutorEmail: "nafis.buet@mentorlagbe.demo",
    tutorName: "Nafis Chowdhury",
    bannerImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    description:
      "Hands-on mentorship in TypeScript, React, Next.js App Router, MongoDB, and REST APIs with live code reviews and real portfolio projects.",
  },
  {
    title: "HSC ICT: C Programming, HTML & Number Systems",
    subject: "ICT",
    classLevel: "HSC (Class 11-12)",
    mode: "Online",
    location: "Online / Pan-Bangladesh",
    schedule: "2 days / week",
    monthlyFee: 3000,
    tutorEmail: "nafis.buet@mentorlagbe.demo",
    tutorName: "Nafis Chowdhury",
    bannerImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    description:
      "Zero-to-A+ preparation for HSC ICT covering Logic Gates, HTML/Web Design, SQL Databases, and C Programming board practicals.",
  },
  {
    title: "IELTS Academic Band 7.5+ Fast-Track Coaching",
    subject: "English & IELTS",
    classLevel: "Professional & Skills",
    mode: "Hybrid",
    location: "Uttara, Dhaka",
    schedule: "3 days / week",
    monthlyFee: 6500,
    tutorEmail: "farhana.ielts@mentorlagbe.demo",
    tutorName: "Farhana Akter",
    bannerImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop",
    description:
      "Personalized Speaking mock interviews, Writing Task 1 & 2 line-by-line feedback, and Reading/Listening time-management drills.",
  },
  {
    title: "Cambridge O-Level English Language & Literature",
    subject: "English & IELTS",
    classLevel: "Cambridge O / A-Level",
    mode: "Online",
    location: "Online / Pan-Bangladesh",
    schedule: "2 days / week",
    monthlyFee: 5500,
    tutorEmail: "farhana.ielts@mentorlagbe.demo",
    tutorName: "Farhana Akter",
    bannerImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
    description:
      "Structured essay writing, comprehension precision, and directed writing practice tailored for CAIE O-Level 1123.",
  },
  {
    title: "SSC Class 9-10 General & Higher Math Foundation",
    subject: "Higher Mathematics",
    classLevel: "SSC (Class 9-10)",
    mode: "Offline",
    location: "Mirpur, Dhaka",
    schedule: "4 days / week",
    monthlyFee: 3800,
    tutorEmail: "tanvir.math@mentorlagbe.demo",
    tutorName: "Tanvir Hasan",
    bannerImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop",
    description:
      "Step-by-step Algebra, Trigonometry, Mensuration, and Geometry coaching with bi-weekly board-standard evaluations for GPA-5.",
  },
  {
    title: "SSC Class 9-10 Physics & General Science",
    subject: "Physics",
    classLevel: "SSC (Class 9-10)",
    mode: "Offline",
    location: "Gulshan, Dhaka",
    schedule: "3 days / week",
    monthlyFee: 4500,
    tutorEmail: "tanvir.math@mentorlagbe.demo",
    tutorName: "Tanvir Hasan",
    bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    description:
      "Interactive conceptual lessons and numerical problem solving for SSC Physics chapters from Motion to Modern Electronics.",
  },
  {
    title: "HSC Accounting & Finance Complete Board Prep",
    subject: "Accounting",
    classLevel: "HSC (Class 11-12)",
    mode: "Hybrid",
    location: "Motijheel, Dhaka",
    schedule: "3 days / week",
    monthlyFee: 4200,
    tutorEmail: "mahbub.acct@mentorlagbe.demo",
    tutorName: "Mahbubur Rahman",
    bannerImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    description:
      "Master Financial Statements, Depreciation, Bank Reconciliation, and Cost Accounting with board question bank practice.",
  },
  {
    title: "Medical Admission Biology & Zoology Intensive",
    subject: "Biology",
    classLevel: "University Admission",
    mode: "Online",
    location: "Online / Pan-Bangladesh",
    schedule: "4 days / week",
    monthlyFee: 5200,
    tutorEmail: "zarin.du@mentorlagbe.demo",
    tutorName: "Zarin Subah",
    bannerImage: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1200&auto=format&fit=crop",
    description:
      "High-yield Botany & Zoology line-by-line textbook coverage, mnemonics, and timed MCQ exams for Medical Admission.",
  },
];

async function seed() {
  const uri = loadMongoUri();
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("mentorlagbe");

  const usersCol = db.collection("user");
  const tuitionsCol = db.collection("tuitions");
  const applicationsCol = db.collection("applications");
  const reviewsCol = db.collection("reviews");

  let usersAdded = 0;
  for (const u of DEMO_USERS) {
    const existing = await usersCol.findOne({ email: u.email });
    if (!existing) {
      await usersCol.insertOne({
        ...u,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      usersAdded++;
    }
  }

  let tuitionsAdded = 0;
  const tuitionIdByTitle = new Map();
  for (let i = 0; i < DEMO_TUITIONS.length; i++) {
    const t = DEMO_TUITIONS[i];
    const existing = await tuitionsCol.findOne({ title: t.title });
    if (existing) {
      tuitionIdByTitle.set(t.title, existing._id.toString());
    } else {
      const createdAt = new Date(Date.now() - i * 3600 * 1000 * 12);
      const res = await tuitionsCol.insertOne({
        ...t,
        approvalStatus: "approved",
        isActive: true,
        createdAt,
        updatedAt: createdAt,
      });
      tuitionIdByTitle.set(t.title, res.insertedId.toString());
      tuitionsAdded++;
    }
  }

  // Seed connected Applications & Reviews for top-rated Hero tuition + rich details pages
  const seedApplications = [
    {
      tuitionTitle: "HSC Physics & BUET Admission Intensive Batch",
      tutorEmail: "tahmidur.buet@mentorlagbe.demo",
      tutorName: "Tahmidur Rahman",
      studentName: "Ayaan Karim",
      studentEmail: "ayaan.student@mentorlagbe.demo",
      studentPhone: "+880 1755-102030",
      preferredSchedule: "Sat, Mon, Wed at 5:30 PM",
      note: "Preparing for BUET admission and want strong mechanics & electromagnetism practice.",
      status: "Accepted",
      rating: 5,
      comment:
        "Best Physics mentor! The weekly BUET-style problem sheets and clear derivations boosted my confidence tremendously.",
    },
    {
      tuitionTitle: "HSC Physics & BUET Admission Intensive Batch",
      tutorEmail: "tahmidur.buet@mentorlagbe.demo",
      tutorName: "Tahmidur Rahman",
      studentName: "Rafi Ahmed",
      studentEmail: "rafi.student@mentorlagbe.demo",
      studentPhone: "+880 1955-708090",
      preferredSchedule: "Sun, Tue, Thu at 7:00 PM",
      note: "Need help with Waves, Optics, and Modern Physics numericals.",
      status: "Accepted",
      rating: 5,
      comment:
        "Very structured batch with immediate doubt-clearing after every class. Highly recommended for HSC & admission students!",
    },
    {
      tuitionTitle: "Cambridge O / A-Level Chemistry Past Paper Clinic",
      tutorEmail: "zarin.du@mentorlagbe.demo",
      tutorName: "Zarin Subah",
      studentName: "Nusrat Jahan",
      studentEmail: "nusrat.student@mentorlagbe.demo",
      studentPhone: "+880 1855-405060",
      preferredSchedule: "Sun, Tue, Thu at 6:00 PM",
      note: "Aiming for an A* in CAIE A-Level Chemistry Paper 4.",
      status: "Accepted",
      rating: 5,
      comment:
        "Zarin ma'am explains organic synthesis pathways so clearly and marks past papers exactly like Cambridge examiners.",
    },
    {
      tuitionTitle: "Full-Stack Web Development & Next.js Mentorship",
      tutorEmail: "nafis.buet@mentorlagbe.demo",
      tutorName: "Nafis Chowdhury",
      studentName: "Rafi Ahmed",
      studentEmail: "rafi.student@mentorlagbe.demo",
      studentPhone: "+880 1955-708090",
      preferredSchedule: "Fri, Sat at 8:00 PM",
      note: "Want to build production Next.js + MongoDB apps with code reviews.",
      status: "Accepted",
      rating: 5,
      comment:
        "Practical, project-driven mentorship. Learned App Router, auth, and MongoDB aggregation in weeks.",
    },
    {
      tuitionTitle: "IELTS Academic Band 7.5+ Fast-Track Coaching",
      tutorEmail: "farhana.ielts@mentorlagbe.demo",
      tutorName: "Farhana Akter",
      studentName: "Ayaan Karim",
      studentEmail: "ayaan.student@mentorlagbe.demo",
      studentPhone: "+880 1755-102030",
      preferredSchedule: "Sat, Mon at 8:00 PM",
      note: "Targeting Band 8.0 for undergraduate scholarship applications.",
      status: "Pending",
    },
  ];

  let appsAdded = 0;
  let reviewsAdded = 0;

  for (const item of seedApplications) {
    const tuitionId = tuitionIdByTitle.get(item.tuitionTitle);
    if (!tuitionId) continue;

    const existingApp = await applicationsCol.findOne({
      tuitionId,
      studentEmail: item.studentEmail,
    });

    if (!existingApp) {
      await applicationsCol.insertOne({
        tuitionId,
        tuitionTitle: item.tuitionTitle,
        tutorEmail: item.tutorEmail,
        tutorName: item.tutorName,
        studentName: item.studentName,
        studentEmail: item.studentEmail,
        studentPhone: item.studentPhone,
        preferredSchedule: item.preferredSchedule,
        note: item.note,
        status: item.status,
        createdAt: new Date(Date.now() - 86400 * 1000 * 3),
      });
      appsAdded++;
    }

    if (item.status === "Accepted" && item.rating && item.comment) {
      const existingReview = await reviewsCol.findOne({
        tuitionId,
        studentEmail: item.studentEmail,
      });
      if (!existingReview) {
        const studentDoc = await usersCol.findOne({ email: item.studentEmail });
        await reviewsCol.insertOne({
          tuitionId,
          tuitionTitle: item.tuitionTitle,
          studentName: item.studentName,
          studentEmail: item.studentEmail,
          studentImage: studentDoc?.image || null,
          rating: item.rating,
          comment: item.comment,
          createdAt: new Date(Date.now() - 86400 * 1000),
          updatedAt: new Date(Date.now() - 86400 * 1000),
        });
        reviewsAdded++;
      }
    }
  }

  console.log(
    JSON.stringify(
      {
        success: true,
        usersAdded,
        tuitionsAdded,
        appsAdded,
        reviewsAdded,
        totals: {
          users: await usersCol.countDocuments(),
          tuitions: await tuitionsCol.countDocuments(),
          applications: await applicationsCol.countDocuments(),
          reviews: await reviewsCol.countDocuments(),
        },
      },
      null,
      2
    )
  );

  await client.close();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Calendar, Users, MapPin, Trophy, Medal, ArrowLeft } from 'lucide-react';
import StarryBackground from '../components/StarryBackground';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // This would ideally come from an API or context, but for now using the same data structure
  const events = [
    {
      id: 1,
      title: "DSA QUEST",
      date: "12-09-2024 & 14-09-2024",
      location: "Own Location (Round 1 - Quizizz Platform) & IIEC (CB 207) (Round 2- Hacker rank Platform)",
      attendees: "Various",
      description: "The MSC organized an event DSA Quest on 12-09-2024 & 14-09-2024. This report aims to provide an overview of the event. In the first round of DSAQuest, participants faced a series of multiple-choice questions focused on Data Structures and Algorithms (DSA), a core area in computer science. This round is designed to test participant's knowledge, quick thinking, and problem solving abilities, setting the foundation for the more intensive challenges in Round 2. Round 2 of DSAQuest brings the top participants to an offline coding challenge where they will solve two complex Data Structures and Algorithms (DSA) problems. This private contest will test their coding skills, logical thinking, and ability to work under pressure. It's the final step to prove their expertise and claim victory. This report aims to capture the essence of the event and its impact on the participants, emphasizing the significance of such knowledge-sharing initiatives in the WINNER G.V.N.Mohith Krishna (21MIS7077) & K.Rishi Varma (21MIC7109), 1st Runner-Up Y D Chandra Kumar (22BCE20511) & Harish Nayani (22BCE8034), 2nd Runner-Up Pranay Kamble (23BCE7303) & sai Siddharth (23BCE7824).",
      winner: {
        name: "G.V.N.Mohith Krishna & K.Rishi Varma",
        position: "Winner"
      },
      runnerUp1: {
        name: "Y D Chandra Kumar & Harish Nayani",
        position: "1st Runner-Up"
      },
      runnerUp2: {
        name: "Pranay Kamble & sai Siddharth",
        position: "2nd Runner-Up"
      },
      images: [
        {
          url: "/gallery/dsa-1.jpg",
          alt: "DSA Quest Round 1",
          caption: "Participants taking the Quizizz quiz"
        },
        {
          url: "/gallery/dsa-2.jpg",
          alt: "DSA Quest Round 2",
          caption: "Coding challenge in progress"
        },
        {
          url: "/gallery/dsa-3.jpg",
          alt: "Winners announcement",
          caption: "Celebrating the top performers"
        }
      ]
    },
    {
      id: 2,
      title: "The CIPHER SAGA",
      date: "September 6, 2025",
      location: "Newton Hall, CB-G18",
      attendees: "Various",
      description: "The Cipher Saga, a cybersecurity competition, was successfully conducted on September 6, 2025, at Newton Hall, AB1 and CB-G18, from 9:00 AM to 6:00 PM. Organized by the Microsoft Student Chapter, in collaboration with Null Chapter, the event aimed to enhance students' cybersecurity skills through practical challenges. The competition featured a multi-round format designed to progressively test participants' technical abilities. Beginning with an online screening round that assessed logical and analytical skills, participants advanced through three main rounds: 'The Deception' focused on digital forensics and coding puzzles, 'The Cryptic' challenged teams with classical ciphers and encryption tasks, and 'The Final Escape' presented a comprehensive Capture the Flag (CTF) experience covering web security, network forensics, steganography, reverse engineering, etc. The event successfully engaged students in hands-on cybersecurity challenges, promoting teamwork and problem-solving under pressure. Participants gained valuable exposure to real-world security scenarios. The competition effectively achieved its objectives of building cybersecurity awareness, strengthening technical skills, and fostering collaborative learning among participants.",
      winner: {
        name: "Vatanesh Sharma & Atharv Sharma",
        position: "1st Place"
      },
      runnerUp1: {
        name: "Surya D Naidu & Tarini Bandlamudi",
        position: "2nd Place"
      },
      images: [
        {
          url: "/gallery/cipher-1.png",
          alt: "Cipher Saga competition setup",
          caption: "Teams working on cybersecurity challenges"
        },
        {
          url: "/gallery/cipher-2.png",
          alt: "CTF round in progress",
          caption: "Participants solving complex security puzzles"
        },
        {
          url: "/gallery/cipher-3.png",
          alt: "Winners announcement",
          caption: "Celebrating the top cybersecurity teams"
        }
      ]
    },
    {
      id: 3,
      title: "CS QUEST",
      date: "5th April, 2025",
      location: "IIEC HALL CB",
      attendees: "Various",
      description: "CS Quest: On April 5, 2025, the Microsoft Student Chapter at VIT-AP University, in collaboration with Unstop, hosted CS Quest—a full-day event dedicated to testing wit, technical aptitude, and strategic thinking. Held at IIEC HALL - CB, this unique competition brought together sharp minds eager to compete and collaborate. CS Quest featured a dynamic blend of computer science challenges, encouraging participants to step out of their comfort zones and push their problem-solving abilities to new limits. From logic-based rounds to coding conundrums and mind-bending puzzles, the event offered an all-encompassing test of skill and speed. Participants competed for a total prize pool of ₹6,000 along with exclusive merchandise sponsored by Unstop, making the stakes as exciting as the challenges themselves. This report aims to capture the energy, engagement, and enthusiasm witnessed during CS Quest—highlighting the importance of such initiatives in fostering a culture of learning, competition, and innovation among future tech leaders.",
      winner: {
        name: "Vaibhav",
        position: "Winner"
      },
      runnerUp1: {
        name: "Ram",
        position: "1st Runner-Up"
      },
      runnerUp2: {
        name: "Chandra",
        position: "2nd Runner-Up"
      },
      images: [
        {
          url: "/gallery/cs-1.png",
          alt: "CS Quest competition setup",
          caption: "Participants engaging in computer science challenges"
        },
        {
          url: "/gallery/cs-2.png",
          alt: "Logic-based rounds",
          caption: "Teams solving puzzles and coding conundrums"
        },
        {
          url: "/gallery/cs-3.png",
          alt: "Winners announcement",
          caption: "Celebrating the top performers with prizes"
        }
      ]
    },
    {
      id: 4,
      title: "HackArcade",
      date: "18th and 19th January, 2025",
      location: "CB 305 and CB 210",
      attendees: "Various",
      description: "The MSC organized a 24-hr Hackathon named 'HackArcade', on 18th and 19th January, 2025. This report aims to provide an overview of the event. HackArcade: A 24-Hour Hackathon of Innovation and Creativity HackArcade, a 24-hour hackathon organized by the Microsoft Student Chapter, provided a platform for participants to unleash their technical expertise, creativity, and problem-solving skills. Designed to challenge boundaries and inspire innovation, the event featured 3 exciting tracks: ● Game Development: Participants crafted immersive gaming experiences using platforms like Unity, Unreal Engine, or Godot. ● Web + Game Development: Teams synergized web and game development to create seamless platforms that enhanced the overall gaming experience with interactive and innovative designs. ● Web Development: Innovators built platforms for the gaming community, such as fan portals, gaming blogs, and interactive websites celebrating the world of gaming. Each track's winning team was rewarded with cash prizes from the ₹6,000 prize pool. HackArcade empowered participants to transform ideas into reality and redefine what's possible in gaming and web development.",
      winner: {
        name: "Atharv Rastogi, Abhiram, Divyadyuti Dutta",
        position: "Winner"
      },
      runnerUp1: {
        name: "Katakam Satya, Rakib Mondal, Dhawan Singh",
        position: "1st Runner-Up"
      },
      images: [
        {
          url: "/gallery/hackarcade-1.png",
          alt: "HackArcade hackathon setup",
          caption: "Participants working on gaming projects"
        },
        {
          url: "/gallery/hackarcade-2.png",
          alt: "Game development track",
          caption: "Teams building immersive gaming experiences"
        },
        {
          url: "/gallery/hackarcade-3.png",
          alt: "Web development track",
          caption: "Creating gaming platforms and websites"
        }
      ]
    },
    {
      id: 5,
      title: "DSA Quest: Fast & Furious Edition",
      date: "28th (Online) and 30th August, 2025 (Offline)",
      location: "AB-1 Newton Hall",
      attendees: "Various",
      description: "DSA QUEST: Fast & Furious Edition – A Battle of Speed and Precision The Microsoft Student Chapter proudly hosted DSA QUEST: Fast & Furious Edition on August 28th and 30th, 2025, a high-stakes coding contest that brought together some of the brightest problem solvers. The event was designed to test participants' mastery of data structures and algorithms (DSA) while pushing their limits of speed, logic, and precision. The competition unfolded in three intense rounds, each crafted to challenge a different dimension of coding expertise: Round 1 – Ride or Die MCQ: Participants started with a rapid-fire set of multiple-choice questions, ranging from fundamentals to edge cases. This round acted as a filter for sharp thinkers who could balance accuracy along with speed. Round 2 – Code it to the Max: Qualifiers advanced to hands-on coding, solving algorithmic and DSA-based problems of varying difficulty. With the leaderboard ticking and time pressure mounting, participants showcased not just their problem-solving ability but also their efficiency in coding under stress. Round 3 – Rapid Fire League: The grand finale tested the best of the best. Eight finalists battled through an application-based, difficult DSA challenge in a knockout format (8 → 4 → 2 → 1). Evaluated by a panel of faculty members, this round demanded clarity of thought, adaptability, and nerves of steel. To keep the competitive spirit high, the event offered a prize pool of ₹3,000. The event was not just about winning—it was about learning, experiencing real-time pressure, and growing as a problem solver. The participants walked away with sharpened coding reflexes, exposure to competitive environments, and the thrill of tackling problems head-on. Events like DSA QUEST stand as proof that competitive coding is more than just algorithms—it's about resilience, focus, and the pursuit of excellence.",
      winner: {
        name: "ATHIPATLA DEERAJ KUMAR (22BCE8574)",
        position: "Winner"
      },
      runnerUp1: {
        name: "MAMIDI GIRI NAGA VENKATA RANGA PRANEETH (23BCE9683)",
        position: "1st Runner-Up"
      },
      runnerUp2: {
        name: "VAISHYARAJU HARSHITHA (23BCE9773)",
        position: "2nd Runner-Up"
      },
      images: [
        {
          url: "/gallery/dsa-fast-1.png",
          alt: "DSA Quest Fast & Furious Round 1",
          caption: "Participants taking the rapid-fire MCQ round"
        },
        {
          url: "/gallery/dsa-fast-2.png",
          alt: "DSA Quest Fast & Furious Round 2",
          caption: "Coding challenge under time pressure"
        },
        {
          url: "/gallery/dsa-fast-3.png",
          alt: "DSA Quest Fast & Furious Winners",
          caption: "Celebrating the top performers"
        }
      ]
    },
    {
      id: 6,
      title: "Morse Mystique",
      date: "27th February, 2025",
      location: "Newton Hall, AB1",
      attendees: "Various",
      description: "Morse Mystique was more than just a competition—it was an electrifying experience where logic met excitement! The event welcomed students eager to test their problem-solving skills, challenge their analytical thinking, and, most importantly, have fun while decoding Morse code. From the moment participants stepped into Newton Hall, the air buzzed with anticipation. Teams of two, armed with their wits and a passion for puzzles, prepared to crack codes, unlock challenges, and race against the clock. The Journey Through Morse Mystique • Track 1: Decode the Morse – The Ultimate Quiz Challenge The event kicked off with a 15-question quiz, testing participants' knowledge of Morse code patterns and applications. With only 30 minutes on the clock, teams had to get at least 10 answers right to move forward. It was a battle of both knowledge and quick thinking! • Track 2: The Progressive Decode – Level Up The adrenaline surged in Round 2 as qualifying teams faced a real-time decoding challenge. Each team was given Morse code audio messages, and with every correct submission, a new, trickier level was unlocked. Five intense levels stood between the teams and victory, with the ticking clock adding to the pressure. More Than Just a Competition Beyond the thrill of the challenge, Morse Mystique fostered teamwork, strategic thinking, and problem-solving—skills crucial for every aspiring tech enthusiast. Some teams soared through the levels with impressive speed, while others experienced the frustration (and fun!) of cracking tough codes under pressure. Winners & Recognition The fastest and most accurate team claimed the ₹2500 prize pool, but more than just prizes, participants walked away with an unforgettable experience and bragging rights as Morse code champions!",
      winner: {
        name: "soumya",
        position: "Winner"
      },
      runnerUp1: {
        name: "Vasavi kalyani sure",
        position: "1st Runner-Up"
      },
      runnerUp2: {
        name: "azhar",
        position: "2nd Runner-Up"
      },
      images: [
        {
          url: "/gallery/morse-1.png",
          alt: "Morse Mystique quiz round",
          caption: "Teams taking the Morse code quiz"
        },
        {
          url: "/gallery/morse-2.png",
          alt: "Progressive decode challenge",
          caption: "Participants decoding audio messages"
        },
        {
          url: "/gallery/morse-3.png",
          alt: "Winners announcement",
          caption: "Celebrating the Morse code champions"
        }
      ]
    },
    {
      id: 7,
      title: "Matrix Hackathon",
      date: "27th September, 2025",
      location: "CB-507",
      attendees: "Various",
      description: "Matrix Hackathon 2025 – Innovate. Solve. Conquer. The Microsoft Student Chapter proudly organized Matrix Hackathon 2025 on September 27th, 2025, at CB-507, bringing together brilliant young innovators, designers, and developers for an exciting day of creativity, coding, and problem solving. The event challenged participants to think beyond conventional boundaries and turn bold ideas into impactful solutions. At the start, each team drew a chit that determined their journey ahead: • Red Path – Innovators: Teams created their own problem statements and developed original solutions from scratch. • Blue Path – Solvers: Teams tackled curated, research-level problem statements provided by the organizers. The hackathon unfolded in two engaging and competitive rounds: Round 1 – The Reality Check (9 AM – 1 PM): Teams kick-started the day with a shark tank–style pitch, presenting their ideas, proposed solutions, and business models. Judges assessed clarity of thought, innovation, feasibility, and impact—rewarding teams that combined creativity with practicality. Round 2 – Portal to Prototype (2 PM – 6 PM): After validating their ideas, teams entered the development phase to build working prototypes while meeting progress checkpoints. Midway, a surprise feature twist tested their adaptability and teamwork under pressure. The round concluded with final prototype presentations, evaluated on technical execution, creativity, functionality, and overall presentation. The event concluded with the announcement of two major winners: • Red Pill Winner: Best innovation from self-created ideas. • Blue Pill Winner: Best solution from provided problem statements. Matrix Hackathon 2025 stood as a testament to innovation under pressure— celebrating creativity, collaboration, and technical excellence. Participants left with enhanced skills, real-world experience, and the thrill of bringing their visions to life. Choose your path. Build your vision. Claim your victory.",
      winner: {
        name: "404 Found (Blue Pill Winner)",
        position: "Winner"
      },
      winner2: {
        name: "Marine Drive (Red Pill Winner)",
        position: "Winner"
      },
      runnerUp1: {
        name: "Ignite (Blue Pill Runner-Up)",
        position: "1st Runner-Up"
      },
      runnerUp2: {
        name: "Zeroday (Red Pill Runner-Up)",
        position: "1st Runner-Up"
      },
      images: [
        {
          url: "/gallery/matrix-1.png",
          alt: "Matrix Hackathon pitch round",
          caption: "Teams presenting their ideas in shark tank style"
        },
        {
          url: "/gallery/matrix-2.png",
          alt: "Prototype development",
          caption: "Participants building working prototypes"
        },
        {
          url: "/gallery/matrix-3.png",
          alt: "Winners announcement",
          caption: "Celebrating the Red and Blue Pill winners"
        }
      ]
    },
    {
      id: 8,
      title: "Cloud Ascend",
      date: "20th February, 2025",
      location: "G12 CB",
      attendees: "Various",
      description: "The Microsoft Student Chapter successfully organized Cloud Ascend, an insightful webinar featuring Dr. Sibi Chakkaravarthy as the keynote speaker. The event focused on exploring the latest advancements in cloud computing, covering crucial aspects such as cloud architecture, deployment models, security considerations, and real-world applications. Dr. Sibi Chakkaravarthy provided an in-depth analysis of modern cloud technologies, highlighting emerging trends and best practices in the industry. The session offered attendees a comprehensive understanding of cloud computing fundamentals, along with insights into its practical implementation in various sectors. The webinar fostered an engaging discussion on the future of cloud computing. The event concluded with an interactive Q&A session, where participants had the opportunity to clarify doubts and gain expert perspectives on cloud security, scalability, and enterprise adoption. Overall, Cloud Ascend proved to be a highly informative and engaging session, equipping attendees with valuable knowledge and industry-relevant insights into the ever-evolving field of cloud computing.",
      images: [
        {
          url: "/gallery/cloud-ascend-1.png",
          alt: "Cloud Ascend webinar session",
          caption: "Dr. Sibi Chakkaravarthy presenting on cloud computing"
        },
        {
          url: "/gallery/cloud-ascend-2.png",
          alt: "Q&A session",
          caption: "Interactive Q&A with participants"
        },
        {
          url: "/gallery/cloud-ascend-3.png",
          alt: "Event conclusion",
          caption: "Cloud Ascend event wrap-up"
        }
      ]
    },
    {
      id: 9,
      title: "Near-Data Processing",
      date: "09/09/2025",
      location: "Google Meet",
      attendees: "Various",
      description: "The Microsoft Student Chapter of VIT-AP University conducted an online session titled 'Near Data processing: An Emerging computer paradigm' on 9th September at 9:00 PM via Google Meet. Key Insights from Guest Lecture on Near-Data Processing: The guest lecture highlighted several crucial aspects of modern computing challenges and opportunities. The session emphasized sustainability in computing, where near-data processing reduces the excessive movement of data between memory and CPU, thereby improving overall energy efficiency. A major focus was on addressing the issue of high energy consumption in traditional architectures, as near-data approaches help in lowering power requirements and extending system lifetime. The speaker also discussed the role of runtime systems and Instruction Set Architecture (ISA), explaining how architectural support is essential for enabling processors to directly interact with memory units. This innovation not only enhances efficiency but also contributes to the reduction of the carbon footprint of large-scale data centers, aligning with global green technology goals. Furthermore, the lecture underlined the relevance of NDP in data-driven applications such as Artificial Intelligence, Big Data, and Machine Learning, where bringing computation closer to storage significantly reduces latency and improves processing speed. The talk concluded by addressing the trade-off between the increasing capacity of modern processors and the corresponding rise in power consumption, stressing how near data processing provides a balanced approach to achieving both high performance and energy optimization.",
      images: [
        {
          url: "/gallery/ndp-1.png",
          alt: "Near-Data Processing session",
          caption: "Guest lecture on emerging computing paradigms"
        },
        {
          url: "/gallery/ndp-2.png",
          alt: "Q&A session",
          caption: "Interactive discussion with participants"
        },
        {
          url: "/gallery/ndp-3.png",
          alt: "Event conclusion",
          caption: "Near-Data Processing session wrap-up"
        }
      ]
    },
    {
      id: 10,
      title: "Future-Ready Computing: The Memory Shift",
      date: "19/09/2025",
      location: "Google Meet",
      attendees: "Various",
      description: "The Microsoft Student Chapter of VIT-AP University conducted an online session titled 'Future-Ready Computing: The Memory Shift'. The session was delivered by Dr. Arijit Nath, an Assistant Professor at IIIT Guwahati. The primary objective of the event was to provide participants with a comprehensive overview of advancements in computing systems and emerging memory technologies that are shaping the future of computing. Dr. Nath divided the presentation into two main parts. • Part A, Advancement in Computing Systems, explored the historical development of computers, focusing on Moore's Law and the subsequent challenges of the 'Power Wall' and 'Memory Wall'. It covered the paradigm shift from single-core to multi-core processors and the rise of specialized accelerators like GPUs and TPUs to handle modern workloads. • Part B, Emerging Memory Technologies, delved into innovative solutions designed to overcome current bottlenecks. Key topics included Near Data Processing (NDP), Emerging Non-Volatile Memories (NVM), Intermittent Computing for low-power IoT devices, and Disaggregated Memory Systems. Dr. Nath also shared insights from his own thesis work on enhancing the endurance of Non-Volatile Memory. Through this session, participants gained valuable insights into the architectural evolution of computers and the critical role of memory innovation in supporting demanding applications like AI, Machine Learning, and Big Data Analytics. The event encouraged students to understand the core challenges in computer architecture and explore the future of high performance, energy-efficient computing.",
      images: [
        {
          url: "/gallery/memory-shift-1.png",
          alt: "Future-Ready Computing session",
          caption: "Guest lecture on memory technologies"
        },
        {
          url: "/gallery/memory-shift-2.png",
          alt: "Q&A session",
          caption: "Interactive discussion with participants"
        },
        {
          url: "/gallery/memory-shift-3.png",
          alt: "Event conclusion",
          caption: "Future-Ready Computing session wrap-up"
        }
      ]
    },
    {
      id: 11,
      title: "Cognition To Code",
      date: "10th August, 2025",
      location: "Google Meet",
      attendees: "Various",
      description: "The Microsoft Student Chapter of VIT-AP University conducted an online session titled 'Cognition to Code: An Introduction to Human Computer Interaction' on 10th August at 9:00 PM via Google Meet. The session was delivered by Dr. Ujjwal Biswas, Assistant Professor in the Department of Computer Science and Engineering at NIT Manipur. The primary objective of the event was to introduce participants to the fundamentals of Human Computer Interaction (HCI) and highlight its role in designing effective, user-friendly systems. Dr. Biswas discussed: • The technology behind computers and how hardware interacts with software to deliver intelligent solutions. • The software powering digital intelligent services, focusing on how AI-driven and cognitive systems process, adapt, and respond to user needs. • Digital services applications and their architecture, demonstrating how modern platforms provide seamless user experiences. • Examples of interactive systems, showcasing real-world applications where user interface design and user experience are crucial for usability and engagement. Through this session, participants gained valuable insights into how cognitive science principles can be integrated with technology to improve interaction between humans and machines. The event also encouraged students to explore the development of interactive systems and to understand the design decisions that impact user satisfaction and efficiency.",
      images: [
        {
          url: "/gallery/ctc-1.png",
          alt: "Cognition To Code session",
          caption: "Guest lecture on Human Computer Interaction"
        },
        {
          url: "/gallery/ctc-2.png",
          alt: "Q&A session",
          caption: "Interactive discussion with participants"
        },
        {
          url: "/gallery/ctc-3.png",
          alt: "Event conclusion",
          caption: "Cognition To Code session wrap-up"
        }
      ]
    },
    {
      id: 12,
      title: "InsightML: Unlocking The Future",
      date: "27/10/2024",
      location: "Google Meet",
      attendees: "Various",
      description: "The Microsoft Student Chapter recently held an insightful and impactful webinar titled 'InsightML: Unlocking the Future,' featuring the distinguished Dr. Prashanth Rajam, a leading expert in the fields of machine learning and data science. Known for his groundbreaking work and extensive experience, Dr. Rajam delivered an engaging and informative session that brought complex machine learning concepts to life, making them accessible to a diverse audience of students and professionals alike. In this two-hour session, Dr. Rajam provided a comprehensive introduction to the fundamentals of machine learning, covering essential topics such as supervised and unsupervised learning, algorithm development, and model training. His expert knowledge and clear explanations demystified these complex subjects, allowing participants to gain a solid foundation in machine learning. Dr. Rajam emphasized how machine learning is not just a theoretical field but a practical tool that is actively shaping various industries. He illustrated how machine learning is transforming healthcare, finance, and technology by driving decision-making processes, optimizing workflows, and solving complex problems that were previously insurmountable. One of the highlights of the event was Dr. Rajam's use of real-world examples to demonstrate the practical applications of machine learning. By showcasing case studies from different industries, he helped attendees understand the versatility of machine learning and its potential to revolutionize traditional methods. Dr. Rajam's ability to relate technical concepts to everyday scenarios resonated with participants, from beginners to those with a prior background in data science. The session also included a Q&A segment where Dr. Rajam addressed questions from participants, further enriching the learning experience. His responses provided clarity on advanced topics and offered insights into the current trends and future directions of machine learning, especially as it relates to career and research opportunities. Attendees gained valuable advice on how to further explore and develop their skills in machine learning, with Dr. Rajam guiding them on how to navigate the rapidly evolving landscape of ML technologies. By the end of the webinar, participants walked away with not only a clearer understanding of machine learning fundamentals but also a sense of excitement and curiosity about its potential. Dr. Rajam's passion and expertise inspired many to consider machine learning as a tool for innovation and personal growth. 'InsightML: Unlocking the Future' was a resounding success, equipping attendees with knowledge that will be invaluable in their academic and professional journeys, while also sparking new interest in the transformative power of machine learning.",
      images: [
        {
          url: "/gallery/insightml-1.png",
          alt: "InsightML session",
          caption: "Guest lecture on Machine Learning"
        },
        {
          url: "/gallery/insightml-2.png",
          alt: "Q&A session",
          caption: "Interactive discussion with participants"
        },
        {
          url: "/gallery/insightml-3.png",
          alt: "Event conclusion",
          caption: "InsightML session wrap-up"
        }
      ]
    },
    {
      id: 13,
      title: "AI Horizons",
      date: "13th March, 2025",
      location: "Google Meet",
      attendees: "Various",
      description: "The Microsoft Student Chapter successfully hosted AI Horizons, an insightful webinar featuring Al Ameen A, an esteemed AI Expert, Academic Coordinator & Project Head at Edapt, AI Mentor, and Certified Prompt Engineer. The session provided a deep dive into the rapidly evolving world of AI tools, exploring their applications across various domains. Al Ameen A shared his expertise on the latest advancements, practical use cases, and the transformative potential of AI-driven technologies. Attendees gained hands-on insights into cutting-edge tools, learning how AI is reshaping industries and enhancing productivity. The event fostered an engaging discussion on the future of AI, equipping participants with valuable knowledge about the most impactful tools in the field. The session concluded with an interactive Q&A, where attendees had the opportunity to clarify doubts and gain expert perspectives on AI innovation. AI Horizons proved to be an enriching experience, empowering participants with industry-relevant insights into the ever-expanding landscape of artificial intelligence.",
      images: [
        {
          url: "/gallery/ai-1.png",
          alt: "AI Horizons session",
          caption: "Guest lecture on AI tools"
        },
        {
          url: "/gallery/ai-2.png",
          alt: "Q&A session",
          caption: "Interactive discussion with participants"
        },
        {
          url: "/gallery/ai-3.png",
          alt: "Event conclusion",
          caption: "AI Horizons session wrap-up"
        }
      ]
    },
    {
      id: 14,
      title: "ElevateU",
      date: "07/11/2024",
      location: "Google Meet",
      attendees: "Various",
      description: "The Microsoft Student Chapter held a very informative and insightful webinar, 'ElevateU', featuring guest speaker Dr. Ipseeta Nanda, an IEEE professional member with 19 years' experience in teaching, research and administration. Dr. Nanda, who is an expert in curriculum design, shared her thoughts and valuable insights regarding various skills and goals to achieve a well-shaped career path. During this session, Dr. Nanda emphasized on skillsets and the overall mindset to follow a career path. Dr. Nanda also talked about how to brand yourself, that is how you can present yourself to the world. She gave her insights regarding how our values, strengths and portfolio should visible and portrayed to the companies and recruiters and how we can improve in these aspects by creating a strong presence online and developing a consistent message. One of such highlights of this webinar was Dr. Nanda's extensive briefing on various fields and sectors of employment and deep understanding of each sector. She stated the future and the current benefits as well as opportunities that are to be offered in today's world. Dr. Nanda illustrated the importance of Goal Setting and the guidance to achieve them. She introduced certain terms and standards that can be set to follow a path which gives a complete understanding and reflection of ourselves on our journey to achieving the goal. After the two-hour session, the attendees gained valuable and a very clear insight and ideas from Dr. Nanda from this webinar which definitely adds on to their potential and their be a good stepping stone to help in their journeys to success.",
      images: [
        {
          url: "/gallery/elevateu-1.png",
          alt: "ElevateU session",
          caption: "Guest lecture on career development"
        },
        {
          url: "/gallery/elevateu-2.png",
          alt: "Q&A session",
          caption: "Interactive discussion with participants"
        },
        {
          url: "/gallery/elevateu-3.png",
          alt: "Event conclusion",
          caption: "ElevateU session wrap-up"
        }
      ]
    }
  ];

  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="min-h-screen bg-white dark:bg-black relative flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <button
            onClick={() => navigate('/gallery')}
            className="apple-button"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev === 0 ? event.images.length - 1 : prev - 1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black relative">
      {/* Starry Background */}
      <div className="fixed inset-0 z-0">
        <StarryBackground />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Back Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate('/gallery')}
          className="flex items-center gap-2 mb-8 text-apple-gray-600 dark:text-apple-gray-300 hover:text-apple-blue transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Gallery
        </motion.button>

        <div className="max-w-6xl mx-auto">
          {/* Event Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
              {event.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-6 text-apple-gray-600 dark:text-apple-gray-300 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-apple-blue" />
                <span className="text-lg">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span className="text-lg">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-apple-blue" />
                <span className="text-lg">{event.attendees} Attendees</span>
              </div>
            </div>
          </motion.div>

          {/* Event Description */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="apple-card p-8 mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 apple-text-gradient">About the Event</h2>
            <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 leading-relaxed">
              {event.description}
            </p>
          </motion.div>

          {/* Winners Section */}
          {event.winner && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 text-center apple-text-gradient">Winners</h2>
              <div className="grid md:grid-cols-4 gap-8">
                {/* Winner */}
                <div className="apple-card p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <Trophy className="w-16 h-16 text-yellow-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 apple-text-gradient">{event.winner.position}</h3>
                  <h4 className="text-lg font-semibold text-apple-gray-800 dark:text-apple-gray-200">
                    {event.winner.name}
                  </h4>
                </div>

                {/* Winner 2 */}
                {event.winner2 && (
                  <div className="apple-card p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <Trophy className="w-16 h-16 text-yellow-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 apple-text-gradient">{event.winner2.position}</h3>
                    <h4 className="text-lg font-semibold text-apple-gray-800 dark:text-apple-gray-200">
                      {event.winner2.name}
                    </h4>
                  </div>
                )}

                {/* 1st Runner Up */}
                {event.runnerUp1 && (
                  <div className="apple-card p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <Medal className="w-16 h-16 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 apple-text-gradient">{event.runnerUp1.position}</h3>
                    <h4 className="text-lg font-semibold text-apple-gray-800 dark:text-apple-gray-200">
                      {event.runnerUp1.name}
                    </h4>
                  </div>
                )}

                {/* 2nd Runner Up */}
                {event.runnerUp2 && (
                  <div className="apple-card p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <Medal className="w-16 h-16 text-amber-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 apple-text-gradient">{event.runnerUp2.position}</h3>
                    <h4 className="text-lg font-semibold text-apple-gray-800 dark:text-apple-gray-200">
                      {event.runnerUp2.name}
                    </h4>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Image Gallery */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="apple-card p-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-center apple-text-gradient">Event Gallery</h2>

            {/* Main Image Display */}
            <div className="relative mb-8">
              <div className="relative overflow-hidden rounded-lg cursor-pointer" onClick={() => setSelectedImage(event.images[currentImageIndex])}>
                <img
                  src={event.images[currentImageIndex].url}
                  alt={event.images[currentImageIndex].alt}
                  className="w-full h-96 md:h-[500px] object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Event+Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white text-lg font-medium">
                    {event.images[currentImageIndex].caption}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              {event.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {event.images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {event.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                      index === currentImageIndex ? 'ring-2 ring-apple-blue scale-105' : 'hover:scale-105'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-20 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=Img';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Event+Image';
                }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white">
                  {selectedImage.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventDetail;

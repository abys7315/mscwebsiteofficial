import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, MapPin } from 'lucide-react';
import StarryBackground from '../components/StarryBackground';

const Events = () => {
  const events = [
    {
      title: "Azure Cloud Workshop",
      date: "March 15, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Microsoft Lab, Block A",
      attendees: "50+",
      description: "Learn how to build and deploy applications using Microsoft Azure cloud services.",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Microsoft Hackathon 2024",
      date: "April 1-3, 2024",
      time: "48 Hours",
      location: "Main Auditorium",
      attendees: "200+",
      description: "A 48-hour coding challenge focused on building innovative solutions using Microsoft technologies.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Web Development with React",
      date: "April 15, 2024",
      time: "3:00 PM - 6:00 PM",
      location: "Seminar Hall 1",
      attendees: "75+",
      description: "Hands-on workshop on building modern web applications using React and TypeScript.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Cloud Ascend",
      date: "20th February, 2025",
      time: "Offline",
      location: "G12 CB",
      attendees: "Various",
      description: "The Microsoft Student Chapter successfully organized Cloud Ascend, an insightful webinar featuring Dr. Sibi Chakkaravarthy as the keynote speaker. The event focused on exploring the latest advancements in cloud computing, covering crucial aspects such as cloud architecture, deployment models, security considerations, and real-world applications. Dr. Sibi Chakkaravarthy provided an in-depth analysis of modern cloud technologies, highlighting emerging trends and best practices in the industry. The session offered attendees a comprehensive understanding of cloud computing fundamentals, along with insights into its practical implementation in various sectors. The webinar fostered an engaging discussion on the future of cloud computing. The event concluded with an interactive Q&A session, where participants had the opportunity to clarify doubts and gain expert perspectives on cloud security, scalability, and enterprise adoption. Overall, Cloud Ascend proved to be a highly informative and engaging session, equipping attendees with valuable knowledge and industry-relevant insights into the ever-evolving field of cloud computing.",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Near-Data Processing",
      date: "09/09/2025",
      time: "9-11 PM IST",
      location: "Google Meet",
      attendees: "Various",
      description: "The Microsoft Student Chapter of VIT-AP University conducted an online session titled 'Near Data processing: An Emerging computer paradigm' on 9th September at 9:00 PM via Google Meet. Key Insights from Guest Lecture on Near-Data Processing: The guest lecture highlighted several crucial aspects of modern computing challenges and opportunities. The session emphasized sustainability in computing, where near-data processing reduces the excessive movement of data between memory and CPU, thereby improving overall energy efficiency. A major focus was on addressing the issue of high energy consumption in traditional architectures, as near-data approaches help in lowering power requirements and extending system lifetime. The speaker also discussed the role of runtime systems and Instruction Set Architecture (ISA), explaining how architectural support is essential for enabling processors to directly interact with memory units. This innovation not only enhances efficiency but also contributes to the reduction of the carbon footprint of large-scale data centers, aligning with global green technology goals. Furthermore, the lecture underlined the relevance of NDP in data-driven applications such as Artificial Intelligence, Big Data, and Machine Learning, where bringing computation closer to storage significantly reduces latency and improves processing speed. The talk concluded by addressing the trade-off between the increasing capacity of modern processors and the corresponding rise in power consumption, stressing how near data processing provides a balanced approach to achieving both high performance and energy optimization.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Future-Ready Computing: The Memory Shift",
      date: "19/09/2025",
      time: "Online",
      location: "Google Meet",
      attendees: "Various",
      description: "The Microsoft Student Chapter of VIT-AP University conducted an online session titled 'Future-Ready Computing: The Memory Shift'. The session was delivered by Dr. Arijit Nath, an Assistant Professor at IIIT Guwahati. The primary objective of the event was to provide participants with a comprehensive overview of advancements in computing systems and emerging memory technologies that are shaping the future of computing. Dr. Nath divided the presentation into two main parts. • Part A, Advancement in Computing Systems, explored the historical development of computers, focusing on Moore's Law and the subsequent challenges of the 'Power Wall' and 'Memory Wall'. It covered the paradigm shift from single-core to multi-core processors and the rise of specialized accelerators like GPUs and TPUs to handle modern workloads. • Part B, Emerging Memory Technologies, delved into innovative solutions designed to overcome current bottlenecks. Key topics included Near Data Processing (NDP), Emerging Non-Volatile Memories (NVM), Intermittent Computing for low-power IoT devices, and Disaggregated Memory Systems. Dr. Nath also shared insights from his own thesis work on enhancing the endurance of Non-Volatile Memory. Through this session, participants gained valuable insights into the architectural evolution of computers and the critical role of memory innovation in supporting demanding applications like AI, Machine Learning, and Big Data Analytics. The event encouraged students to understand the core challenges in computer architecture and explore the future of high performance, energy-efficient computing.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Cognition To Code",
      date: "10th August, 2025",
      time: "Online",
      location: "Google Meet",
      attendees: "Various",
      description: "The Microsoft Student Chapter of VIT-AP University conducted an online session titled 'Cognition to Code: An Introduction to Human Computer Interaction' on 10th August at 9:00 PM via Google Meet. The session was delivered by Dr. Ujjwal Biswas, Assistant Professor in the Department of Computer Science and Engineering at NIT Manipur. The primary objective of the event was to introduce participants to the fundamentals of Human Computer Interaction (HCI) and highlight its role in designing effective, user-friendly systems. Dr. Biswas discussed: • The technology behind computers and how hardware interacts with software to deliver intelligent solutions. • The software powering digital intelligent services, focusing on how AI-driven and cognitive systems process, adapt, and respond to user needs. • Digital services applications and their architecture, demonstrating how modern platforms provide seamless user experiences. • Examples of interactive systems, showcasing real-world applications where user interface design and user experience are crucial for usability and engagement. Through this session, participants gained valuable insights into how cognitive science principles can be integrated with technology to improve interaction between humans and machines. The event also encouraged students to explore the development of interactive systems and to understand the design decisions that impact user satisfaction and efficiency.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "InsightML: Unlocking The Future",
      date: "27/10/2024",
      time: "Online",
      location: "Google Meet",
      attendees: "Various",
      description: "The Microsoft Student Chapter recently held an insightful and impactful webinar titled 'InsightML: Unlocking the Future,' featuring the distinguished Dr. Prashanth Rajam, a leading expert in the fields of machine learning and data science. Known for his groundbreaking work and extensive experience, Dr. Rajam delivered an engaging and informative session that brought complex machine learning concepts to life, making them accessible to a diverse audience of students and professionals alike. In this two-hour session, Dr. Rajam provided a comprehensive introduction to the fundamentals of machine learning, covering essential topics such as supervised and unsupervised learning, algorithm development, and model training. His expert knowledge and clear explanations demystified these complex subjects, allowing participants to gain a solid foundation in machine learning. Dr. Rajam emphasized how machine learning is not just a theoretical field but a practical tool that is actively shaping various industries. He illustrated how machine learning is transforming healthcare, finance, and technology by driving decision-making processes, optimizing workflows, and solving complex problems that were previously insurmountable. One of the highlights of the event was Dr. Rajam's use of real-world examples to demonstrate the practical applications of machine learning. By showcasing case studies from different industries, he helped attendees understand the versatility of machine learning and its potential to revolutionize traditional methods. Dr. Rajam's ability to relate technical concepts to everyday scenarios resonated with participants, from beginners to those with a prior background in data science. The session also included a Q&A segment where Dr. Rajam addressed questions from participants, further enriching the learning experience. His responses provided clarity on advanced topics and offered insights into the current trends and future directions of machine learning, especially as it relates to career and research opportunities. Attendees gained valuable advice on how to further explore and develop their skills in machine learning, with Dr. Rajam guiding them on how to navigate the rapidly evolving landscape of ML technologies. By the end of the webinar, participants walked away with not only a clearer understanding of machine learning fundamentals but also a sense of excitement and curiosity about its potential. Dr. Rajam's passion and expertise inspired many to consider machine learning as a tool for innovation and personal growth. 'InsightML: Unlocking the Future' was a resounding success, equipping attendees with knowledge that will be invaluable in their academic and professional journeys, while also sparking new interest in the transformative power of machine learning.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "AI Horizons",
      date: "13th March, 2025",
      time: "Online",
      location: "Google Meet",
      attendees: "Various",
      description: "The Microsoft Student Chapter successfully hosted AI Horizons, an insightful webinar featuring Al Ameen A, an esteemed AI Expert, Academic Coordinator & Project Head at Edapt, AI Mentor, and Certified Prompt Engineer. The session provided a deep dive into the rapidly evolving world of AI tools, exploring their applications across various domains. Al Ameen A shared his expertise on the latest advancements, practical use cases, and the transformative potential of AI-driven technologies. Attendees gained hands-on insights into cutting-edge tools, learning how AI is reshaping industries and enhancing productivity. The event fostered an engaging discussion on the future of AI, equipping participants with valuable knowledge about the most impactful tools in the field. The session concluded with an interactive Q&A, where attendees had the opportunity to clarify doubts and gain expert perspectives on AI innovation. AI Horizons proved to be an enriching experience, empowering participants with industry-relevant insights into the ever-expanding landscape of artificial intelligence.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "ElevateU",
      date: "07/11/2024",
      time: "Online",
      location: "Google Meet",
      attendees: "Various",
      description: "The Microsoft Student Chapter held a very informative and insightful webinar, 'ElevateU', featuring guest speaker Dr. Ipseeta Nanda, an IEEE professional member with 19 years' experience in teaching, research and administration. Dr. Nanda, who is an expert in curriculum design, shared her thoughts and valuable insights regarding various skills and goals to achieve a well-shaped career path. During this session, Dr. Nanda emphasized on skillsets and the overall mindset to follow a career path. Dr. Nanda also talked about how to brand yourself, that is how you can present yourself to the world. She gave her insights regarding how our values, strengths and portfolio should visible and portrayed to the companies and recruiters and how we can improve in these aspects by creating a strong presence online and developing a consistent message. One of such highlights of this webinar was Dr. Nanda's extensive briefing on various fields and sectors of employment and deep understanding of each sector. She stated the future and the current benefits as well as opportunities that are to be offered in today's world. Dr. Nanda illustrated the importance of Goal Setting and the guidance to achieve them. She introduced certain terms and standards that can be set to follow a path which gives a complete understanding and reflection of ourselves on our journey to achieving the goal. After the two-hour session, the attendees gained valuable and a very clear insight and ideas from Dr. Nanda from this webinar which definitely adds on to their potential and their be a good stepping stone to help in their journeys to success.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black relative">
      {/* Starry Background */}
      <div className="fixed inset-0 z-0">
        <StarryBackground />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Section Background Overlay */}
        <div className="absolute inset-0 bg-black/20 -mx-4"></div>
        
        <div className="relative z-10">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.23, 1, 0.32, 1] 
        }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
          Our Events
        </h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-20 bg-gradient-to-r from-apple-blue to-transparent"></div>
          <Calendar className="w-6 h-6 text-apple-blue" />
          <div className="h-px w-20 bg-gradient-to-l from-purple-500 to-transparent"></div>
        </div>
        <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
          Discover our upcoming and past events, workshops, hackathons, and technical sessions.
        </p>
      </motion.div>

      {/* Events Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "100px 0px" }}
        transition={{ 
          duration: 0.8, 
          ease: [0.23, 1, 0.32, 1] 
        }}
      >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="apple-card overflow-hidden group"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-apple-gray-900 dark:text-white group-hover:text-apple-blue transition-colors">
                {event.title}
              </h3>
              <div className="space-y-3 text-apple-gray-600 dark:text-apple-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-apple-blue" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-apple-blue" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  <span>{event.attendees} Expected Attendees</span>
                </div>
              </div>
              <p className="mt-4 text-apple-gray-600 dark:text-apple-gray-300">
                {event.description}
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                className="mt-6 w-full apple-button"
              >
                Register Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Events;
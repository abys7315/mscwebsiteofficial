import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Award, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const modules = [
    {
      title: "Event Management",
      icon: Calendar,
      description: "Create, edit, and manage events",
      link: "/admin/events",
      color: "cyber-primary"
    },
    {
      title: "Certificate Management",
      icon: Award,
      description: "Generate and validate certificates",
      link: "/admin/certificates",
      color: "cyber-blue"
    },
    {
      title: "Member Applications",
      icon: Users,
      description: "Review and manage member applications",
      link: "/admin/applications",
      color: "cyber-purple"
    },
    {
      title: "Feedback Management",
      icon: MessageSquare,
      description: "View and respond to feedback",
      link: "/admin/feedback",
      color: "cyber-accent"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 cyber-text gradient-text text-center">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={module.link}>
                <div className="cyber-card p-6 h-full hover-lift">
                  <module.icon className={`w-12 h-12 mb-4 text-${module.color}`} />
                  <h3 className="text-xl font-semibold mb-2 cyber-text">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {module.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          {[
            { label: "Total Events", value: "24" },
            { label: "Active Members", value: "156" },
            { label: "Certificates Issued", value: "487" },
            { label: "Pending Applications", value: "12" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="cyber-card p-6 text-center"
            >
              <div className="text-3xl font-bold mb-2 gradient-text">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
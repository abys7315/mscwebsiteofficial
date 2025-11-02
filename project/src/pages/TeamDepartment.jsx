import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Code, Calendar, Megaphone, Palette, PenTool, X, ExternalLink, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import StarryBackground from '../components/StarryBackground';
import teamData from './team.json';

const TeamDepartment = () => {
  const { department } = useParams();
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(null);

  // Utility function to convert Google Drive links to direct image URLs
  const convertDriveLinkToImageUrl = (driveLink) => {
    if (!driveLink || !driveLink.includes('drive.google.com')) {
      return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop'; // fallback
    }
    const fileId = driveLink.split('id=')[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  };

  // Department mapping and configuration
  const departmentConfig = {
    'Admin': { icon: Users, color: '#007AFF' },
    'Technical': { icon: Code, color: '#5856D6' },
    'Events': { icon: Calendar, color: '#34C759' },
    'Outreach': { icon: Megaphone, color: '#FF9500' },
    'Design': { icon: Palette, color: '#FF2D92' },
    'Content': { icon: PenTool, color: '#5AC8FA' },
    'Documentation': { icon: PenTool, color: '#5AC8FA' },
    'Marketing': { icon: Megaphone, color: '#FF9500' },
    'Social Media': { icon: Megaphone, color: '#FF9500' },
    'PR & Outreach': { icon: Megaphone, color: '#FF9500' },
    'Hi-Tech': { icon: Code, color: '#5856D6' },
    'Hi Tech': { icon: Code, color: '#5856D6' },
    'Research and development': { icon: Code, color: '#5856D6' },
    'Creative/Design': { icon: Palette, color: '#FF2D92' },
    'Creative': { icon: Palette, color: '#FF2D92' },
    'CREATIVE': { icon: Palette, color: '#FF2D92' },
    'Event Management': { icon: Calendar, color: '#34C759' },
    'Event Management Department': { icon: Calendar, color: '#34C759' },
    'Event management': { icon: Calendar, color: '#34C759' }
  };

  // Map designation to department
  const mapDesignationToDepartment = (designation) => {
    const mapping = {
      'Admin': 'Admin',
      'Admin Team': 'Admin',
      'Admin Department': 'Admin',
      'Chief Advisor': 'Admin',
      'Director': 'Admin',
      'Executive Secretary': 'Admin',
      'Joint Secretary': 'Admin',
      'Secretary': 'Admin',
      'Deputy Club Manager': 'Admin',
      'Head of internal affairs': 'Admin',
      'Head of external affairs': 'Admin',
      'Club Manager': 'Admin',
      'Technical': 'Technical',
      'Technical Team': 'Technical',
      'Technical team': 'Technical',
      'Hi-Tech': 'Hi-Tech',
      'Hi Tech': 'Hi-Tech',
      'Research and development': 'Research and Development',
      'Research and Development Department': 'Research and Development',
      'Innovation and Research Director': 'Research and Development',
      'Events': 'Event Management',
      'Event Management': 'Event Management',
      'Event Management Department': 'Event Management',
      'Event management': 'Event Management',
      'Event Management Member': 'Event Management',
      'Outreach': 'PR & Outreach',
      'PR & Outreach': 'PR & Outreach',
      'Marketing': 'Marketing',
      'Marketing Team': 'Marketing',
      'Marketing department': 'Marketing',
      'Social media': 'Social Media',
      'Social Media': 'Social Media',
      'Design': 'Design/Creative',
      'Creative/Design': 'Design/Creative',
      'Creative': 'Design/Creative',
      'CREATIVE': 'Design/Creative',
      'Documentation': 'Documentation',
      'Documentation Team': 'Documentation'
    };
    return mapping[designation] || 'Technical'; // default to Technical
  };

  // Process team data for the specific department
  const departmentData = useMemo(() => {
    const departmentMap = {};

    teamData.forEach(member => {
      const deptName = mapDesignationToDepartment(member.Designation);
      if (!departmentMap[deptName]) {
        departmentMap[deptName] = [];
      }

      departmentMap[deptName].push({
        name: member.FullName,
        role: member.TeamMember,
        image: member.image || convertDriveLinkToImageUrl(member.DriveLink),
        bio: member.Bio,
        skills: member.Skills,
        linkedin: member.LinkedIn && member.LinkedIn !== 'NA' && member.LinkedIn !== '' ? member.LinkedIn : null,
        designation: member.Designation
      });
    });

    const dept = departmentMap[department];
    if (!dept) return null;

    const config = departmentConfig[department] || { icon: Code, color: '#5856D6' };

    return {
      name: department,
      icon: config.icon,
      color: config.color,
      members: dept.sort((a, b) => {
        // Define role hierarchy for sorting
        const roleOrder = {
          'Chief Advisor': 0,
          'Deputy Chief Advisor': 1,
          'President' : 2,
          'Vice President':3,
          'Director': 4,
          'Executive Secretary': 7,
          'Joint Secretary': 8,
          'Secretary': 6,
          'Treasurer':9,
          'Deputy Tech Manager': 11,
          'Deputy Club Manager': 13,
          'Head of internal affairs': 20,
          'Head of external affairs': 19,
          'Club Manager': 12,
          'Community Manager':17,
          'Assistant Community Manager':18,
          'Lead': 21,
          'Co-Lead': 22,
          'Coordinator': 23,
          'Member': 24
        };

        const getRolePriority = (role) => {
          for (const [key, priority] of Object.entries(roleOrder)) {
            if (role.toLowerCase().includes(key.toLowerCase())) {
              return priority;
            }
          }
          return 99; // Default priority for unknown roles
        };

        const priorityA = getRolePriority(a.role);
        const priorityB = getRolePriority(b.role);

        return priorityA - priorityB;
      })
    };
  }, [department]);

  if (!departmentData) {
    return (
      <div className="min-h-screen bg-white dark:bg-black relative flex items-center justify-center">
        <div className="fixed inset-0 z-0">
          <StarryBackground />
        </div>
        <div className="text-center z-10">
          <h1 className="text-4xl font-bold text-apple-gray-900 dark:text-white mb-4">
            Department Not Found
          </h1>
          <button
            onClick={() => navigate('/team')}
            className="px-6 py-3 bg-apple-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Team
          </button>
        </div>
      </div>
    );
  }

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
          {/* Back Button */}
          <motion.button
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            onClick={() => navigate('/team')}
            className="flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Teams
          </motion.button>

          {/* Title */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
              {departmentData.name}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-apple-blue to-transparent"></div>
              <departmentData.icon className="w-6 h-6 text-apple-blue" />
              <div className="h-px w-20 bg-gradient-to-l from-purple-500 to-transparent"></div>
            </div>
            <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
              Meet the talented members of our {departmentData.name} team
            </p>
          </motion.div>

          {/* Team Members Grid */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "100px 0px" }}
            transition={{
              duration: 0.8,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="apple-card p-8"
          >
            {/* Department Header */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${departmentData.color}20` }}
              >
                <departmentData.icon
                  className="w-8 h-8"
                  style={{ color: departmentData.color }}
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-apple-gray-900 dark:text-white">
                  {departmentData.name} Team
                </h2>
                <div
                  className="h-1 w-20 rounded-full mt-2"
                  style={{ backgroundColor: departmentData.color }}
                />
              </div>
            </div>

            {/* Members Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {departmentData.members.map((member, memberIndex) => (
                <motion.div
                  key={member.name}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: memberIndex * 0.05,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
                  }}
                  className="apple-card p-6 text-center group cursor-pointer"
                  onClick={() => setSelectedMember({ ...member, department: departmentData.name, departmentColor: departmentData.color })}
                >
                  {/* Member Photo */}
                  <div className="relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white/20 group-hover:border-white/40 transition-all duration-300"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                      style={{ backgroundColor: departmentData.color }}
                    />
                  </div>

                  {/* Member Info */}
                  <h3 className="text-lg font-semibold text-apple-gray-900 dark:text-white mb-2 group-hover:text-apple-blue transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-apple-gray-600 dark:text-apple-gray-300 text-sm">
                    {member.role}
                  </p>

                  {/* Hover Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: departmentData.color }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Stats */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "100px 0px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mt-20"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { number: departmentData.members.length, label: "Team Members", color: departmentData.color },
                { number: "10", label: "Department", color: "#5856D6" },
                { number: "15+", label: "Events Organized", color: "#34C759" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ y: 40, opacity: 0, scale: 0.9 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="apple-card p-8"
                >
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-apple-gray-600 dark:text-apple-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 w-full min-h-screen z-50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedMember(null)}
              style={{
    position: "absolute",
    top: `${window.scrollY}px`,
  }}
            >

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-3xl overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Mobile Layout: Photo top-left, details right and below */}
              <div className="flex flex-col md:flex-row h-full">
                {/* Photo Section */}
                <div className="flex flex-col md:flex-row md:w-1/2">
                  {/* Photo */}
                  <div className="flex items-center justify-center p-4 md:p-8 relative md:w-full">
                    {/* Background Glow */}
                    <div
                      className="absolute inset-0 opacity-20 blur-3xl rounded-full"
                      style={{ backgroundColor: selectedMember.departmentColor }}
                    />

                      {/* Animated Circle Container */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: [0.23, 1, 0.32, 1],
                        delay: 0.2
                      }}
                      className="relative"
                    >
                      {/* Pulsing Glow Effect */}
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 rounded-full blur-xl"
                        style={{ backgroundColor: selectedMember.departmentColor }}
                      />

                      {/* Outer Ring */}
                      <div
                        className="absolute inset-0 rounded-full border-4 opacity-30"
                        style={{ borderColor: selectedMember.departmentColor }}
                      />

                      {/* Inner Circle with Photo */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.23, 1, 0.32, 1],
                          delay: 0.5
                        }}
                        className="w-40 h-40 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white/20 shadow-2xl relative z-10"
                      >
                        <img
                          src={selectedMember.image}
                          alt={selectedMember.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Details Right (Mobile) */}
                  <div className="flex-1 md:hidden p-4">
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.23, 1, 0.32, 1],
                        delay: 0.3
                      }}
                      className="space-y-4"
                    >
                      {/* Department Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.23, 1, 0.32, 1],
                          delay: 0.6
                        }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${selectedMember.departmentColor}20`,
                          color: selectedMember.departmentColor
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: selectedMember.departmentColor }}
                        />
                        {selectedMember.department}
                      </motion.div>

                      {/* Name */}
                      <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.23, 1, 0.32, 1],
                          delay: 0.7
                        }}
                        className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white"
                      >
                        {selectedMember.name}
                      </motion.h1>

                      {/* Role */}
                      <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.23, 1, 0.32, 1],
                          delay: 0.8
                        }}
                        className="text-lg text-gray-600 dark:text-gray-300 font-medium"
                      >
                        {selectedMember.role}
                      </motion.h2>
                    </motion.div>
                  </div>
                </div>

                {/* Desktop Right Side - All Details */}
                <div className="hidden md:flex md:w-1/2 flex-col justify-center p-12">
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.23, 1, 0.32, 1],
                      delay: 0.3
                    }}
                    className="space-y-6"
                  >
                    {/* Department Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.23, 1, 0.32, 1],
                        delay: 0.6
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${selectedMember.departmentColor}20`,
                        color: selectedMember.departmentColor
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: selectedMember.departmentColor }}
                      />
                      {selectedMember.department}
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.23, 1, 0.32, 1],
                        delay: 0.7
                      }}
                      className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
                    >
                      {selectedMember.name}
                    </motion.h1>

                    {/* Role */}
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.23, 1, 0.32, 1],
                        delay: 0.8
                      }}
                      className="text-xl text-gray-600 dark:text-gray-300 font-medium"
                    >
                      {selectedMember.role}
                    </motion.h2>

                    {/* Bio/Description */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.23, 1, 0.32, 1],
                        delay: 0.9
                      }}
                      className="space-y-4"
                    >
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {selectedMember.bio}
                      </p>

                      {/* Skills */}
                      {selectedMember.skills && (
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Skills & Expertise
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {selectedMember.skills}
                          </p>
                        </div>
                      )}

                      {/* LinkedIn */}
                      {selectedMember.linkedin && (
                        <div className="pt-2">
                          <a
                            href={selectedMember.linkedin.startsWith('http') ? selectedMember.linkedin : `https://${selectedMember.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Mobile Details Below */}
                <div className="md:hidden p-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.23, 1, 0.32, 1],
                      delay: 0.9
                    }}
                    className="space-y-4"
                  >
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedMember.bio}
                    </p>

                    {/* Skills */}
                    {selectedMember.skills && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Skills & Expertise
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {selectedMember.skills}
                        </p>
                      </div>
                    )}

                    {/* LinkedIn */}
                    {selectedMember.linkedin && (
                      <div className="pt-2">
                        <a
                          href={selectedMember.linkedin.startsWith('http') ? selectedMember.linkedin : `https://${selectedMember.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View LinkedIn Profile
                        </a>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamDepartment;

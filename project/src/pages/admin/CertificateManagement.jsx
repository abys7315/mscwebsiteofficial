import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Search, Download, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CertificateManagement = () => {
  const [certificates, setCertificates] = useState([
    {
      id: "MSC2024001",
      name: "John Doe",
      event: "Azure Cloud Workshop",
      date: "2024-03-15",
      email: "john@example.com"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newCertificate, setNewCertificate] = useState({
    name: "",
    event: "",
    email: ""
  });

  const handleGenerateCertificate = (e) => {
    e.preventDefault();
    const id = `MSC${new Date().getFullYear()}${(certificates.length + 1).toString().padStart(3, '0')}`;
    setCertificates([...certificates, {
      ...newCertificate,
      id,
      date: new Date().toISOString().split('T')[0]
    }]);
    setNewCertificate({ name: "", event: "", email: "" });
    toast.success('Certificate generated successfully!');
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      setCertificates(certificates.filter(cert => cert.id !== id));
      toast.success('Certificate deleted successfully!');
    }
  };

  const filteredCertificates = certificates.filter(cert =>
    cert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 cyber-text gradient-text">
          Certificate Management
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Certificate Generation Form */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-1"
          >
            <form onSubmit={handleGenerateCertificate} className="cyber-card p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4 cyber-text">
                Generate New Certificate
              </h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Recipient Name</label>
                <input
                  type="text"
                  value={newCertificate.name}
                  onChange={(e) => setNewCertificate({...newCertificate, name: e.target.value})}
                  className="cyber-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Event Name</label>
                <input
                  type="text"
                  value={newCertificate.event}
                  onChange={(e) => setNewCertificate({...newCertificate, event: e.target.value})}
                  className="cyber-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={newCertificate.email}
                  onChange={(e) => setNewCertificate({...newCertificate, email: e.target.value})}
                  className="cyber-input w-full"
                  required
                />
              </div>

              <button type="submit" className="w-full cyber-button flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Generate Certificate
              </button>
            </form>
          </motion.div>

          {/* Certificates List */}
          <div className="lg:col-span-2">
            <div className="cyber-card p-6">
              <div className="flex items-center gap-4 mb-6">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="cyber-input flex-1"
                />
              </div>

              <div className="space-y-4">
                {filteredCertificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="cyber-card p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Award className="w-8 h-8 text-cyber-primary" />
                      <div>
                        <h3 className="font-semibold">{cert.name}</h3>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <p>ID: {cert.id}</p>
                          <p>Event: {cert.event}</p>
                          <p>Date: {cert.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 cyber-button">
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="p-2 cyber-button bg-red-500 hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CertificateManagement;
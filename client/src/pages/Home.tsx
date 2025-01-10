import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { Calendar, Users, BarChart, Github, Twitter, Linkedin, CheckCircle, Clock, Zap } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <motion.nav 
          className="flex items-center justify-between py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 text-transparent bg-clip-text">
            TaskMaster Pro ✨
          </h1>
          <div className="space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
              className="text-gray-200 hover:text-violet-300 transition-colors"
            >
              Login
            </Button>
            <Button
              variant="default"
              onClick={() => navigate('/register')}
              className="bg-violet-600 hover:bg-violet-700 text-white transition-colors"
            >
              Sign Up
            </Button>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.div 
          className="flex flex-col items-center justify-center text-center min-h-[70vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-violet-300 to-indigo-300 text-transparent bg-clip-text mb-4"
            {...fadeIn}
          >
            Transform Your Workflow 🚀
          </motion.h1>
          <motion.p 
            className="mt-6 text-xl leading-8 text-gray-200 max-w-2xl"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            Streamline your tasks, boost productivity, and achieve more with TaskMaster Pro. 
            The ultimate solution for modern teams. ⚡
          </motion.p>
          <motion.div 
            className="mt-10"
            {...fadeIn}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              onClick={() => navigate('/register')}
              className="text-lg bg-violet-600 hover:bg-violet-700 text-white transition-colors animate-pulse px-8"
            >
              Get Started Now 🎯
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg bg-slate-800/50 backdrop-blur shadow-lg border border-slate-700">
              <div className="text-4xl font-bold text-violet-300 mb-2">10k+</div>
              <div className="text-gray-200">Active Users</div>
            </div>
            <div className="p-6 rounded-lg bg-slate-800/50 backdrop-blur shadow-lg border border-slate-700">
              <div className="text-4xl font-bold text-violet-300 mb-2">1M+</div>
              <div className="text-gray-200">Tasks Completed</div>
            </div>
            <div className="p-6 rounded-lg bg-slate-800/50 backdrop-blur shadow-lg border border-slate-700">
              <div className="text-4xl font-bold text-violet-300 mb-2">99%</div>
              <div className="text-gray-200">Satisfaction Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 text-transparent bg-clip-text mb-4">
              Why Choose TaskMaster Pro? 🌟
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Smart Task Management 📋",
                description: "Intelligent task organization with AI-powered prioritization and deadline management.",
              },
              {
                icon: Users,
                title: "Seamless Collaboration 👥",
                description: "Real-time team collaboration with instant updates and smart notifications.",
              },
              {
                icon: BarChart,
                title: "Advanced Analytics 📊",
                description: "Comprehensive insights with customizable dashboards and performance metrics.",
              },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="p-6 rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="w-12 h-12 text-violet-300 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-gray-100">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          className="py-16 bg-slate-800/50 backdrop-blur rounded-xl shadow-lg my-16 border border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="max-w-3xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-100">Benefits That Make a Difference 💪</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-violet-300 w-6 h-6" />
                <span className="text-gray-200">Boost team productivity by up to 40%</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-violet-300 w-6 h-6" />
                <span className="text-gray-200">Save 10+ hours per week on task management</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="text-violet-300 w-6 h-6" />
                <span className="text-gray-200">Reduce meeting time by 50% with async updates</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="border-t border-slate-700">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-100">TaskMaster Pro</h3>
                <p className="text-gray-300">
                  Empowering teams worldwide to achieve more together. 🌍
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-100">Product</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="hover:text-violet-300 cursor-pointer">Features</li>
                  <li className="hover:text-violet-300 cursor-pointer">Pricing</li>
                  <li className="hover:text-violet-300 cursor-pointer">Documentation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-100">Company</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="hover:text-violet-300 cursor-pointer">About Us</li>
                  <li className="hover:text-violet-300 cursor-pointer">Careers</li>
                  <li className="hover:text-violet-300 cursor-pointer">Contact</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-gray-100">Connect With Us</h4>
                <div className="flex space-x-4">
                  <Github className="w-6 h-6 text-gray-300 hover:text-violet-300 cursor-pointer" />
                  <Twitter className="w-6 h-6 text-gray-300 hover:text-violet-300 cursor-pointer" />
                  <Linkedin className="w-6 h-6 text-gray-300 hover:text-violet-300 cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-700 text-center text-gray-300">
              <p>© 2024 TaskMaster Pro | Created  by Waleed, Dov & Gabriel | All rights reserved. ❤️</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
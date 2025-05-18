import { useState } from "react";
import { CheckCircle, Clock, Layers, List, Menu, X, ChevronRight, Calendar, Star, UserCircle } from "lucide-react";

export default function TaskFlowLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32" aria-label="Top">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <a href="#" className="flex items-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white">
                  <CheckCircle size={24} />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">TaskFlow</span>
              </a>
              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  <a href="#features" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">Features</a>
                  <a href="#pricing" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">Pricing</a>
                  <a href="#testimonials" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">Testimonials</a>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">Log in</a>
              <a href="#" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Sign up</a>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {mobileMenuOpen && (
            <div className="md:hidden py-2 space-y-1">
              <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600">Features</a>
              <a href="#pricing" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600">Pricing</a>
              <a href="#testimonials" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600">Testimonials</a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <a href="#" className="block px-3 py-2 text-base font-medium text-indigo-600 hover:text-indigo-700">Log in</a>
                <a href="#" className="block mt-2 px-3 py-2 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 text-center">Sign up</a>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow bg-white">
        <div className="bg-white">
          <div className="relative isolate">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Streamline Your Tasks with <span className="text-indigo-600">TaskFlow</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                  Stay organized, boost productivity, and accomplish more with our intuitive task management platform designed for teams and individuals.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a href="#" className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Get started
                  </a>
                  <a href="#features" className="text-lg font-semibold leading-6 text-gray-900 flex items-center">
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="features" className="py-16 bg-gradient-to-b from-white to-slate-50 mt-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Powerful Task Management Features</h2>
              <p className="mt-4 text-lg text-gray-600">
                Everything you need to stay on top of your tasks and projects in one place.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-7xl">
              <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <List size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-8 text-gray-900">Task Organization</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Create, organize, and prioritize tasks with intuitive drag-and-drop interfaces.
                  </p>
                </div>
                <div className="relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Layers size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-8 text-gray-900">Project Management</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Group related tasks into projects and track progress with visual dashboards.
                  </p>
                </div>
                <div className="relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <UserCircle size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-8 text-gray-900">Team Collaboration</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Assign tasks, share projects, and communicate with your team seamlessly.
                  </p>
                </div>
                <div className="relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Calendar size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-8 text-gray-900">Scheduling & Due Dates</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Set deadlines, reminders, and view your tasks in calendar format.
                  </p>
                </div>
                <div className="relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Star size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-8 text-gray-900">Priority Management</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Flag important tasks and organize your workflow based on priority levels.
                  </p>
                </div>
                <div className="relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Clock size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-8 text-gray-900">Time Tracking</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Track time spent on tasks and analyze productivity patterns over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-indigo-600">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to boost your productivity?</h2>
              <p className="mt-4 text-lg text-indigo-100">
                Join thousands of users who have transformed the way they manage tasks with TaskFlow.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="#" className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50">
                  Try for free
                </a>
                <a href="#" className="text-lg font-semibold text-white flex items-center">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What our users say</h2>
              <p className="mt-4 text-lg text-gray-600">
                Don't just take our word for it. See what others have accomplished with TaskFlow.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-7xl lg:grid-cols-3">
              <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    "TaskFlow has completely transformed how our team manages projects. The intuitive interface and powerful features have boosted our productivity by at least 30%."
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-lg">
                    SM
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Sarah Mitchell</h3>
                    <p className="text-xs text-gray-500">Project Manager, TechCorp</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    "As a freelancer juggling multiple clients, TaskFlow gives me the structure I need to stay on top of my deadlines and deliverables. I couldn't work without it now."
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-lg">
                    JL
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">James Lee</h3>
                    <p className="text-xs text-gray-500">Freelance Designer</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    "The team collaboration features in TaskFlow have eliminated confusion and miscommunication. Everyone knows what they need to do and when. It's been a game-changer."
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-lg">
                    AK
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Amelia Kumar</h3>
                    <p className="text-xs text-gray-500">Team Lead, Innovate Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex items-center justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <div className="flex items-center justify-center">
              <a href="#" className="flex items-center">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-indigo-600 text-white">
                  <CheckCircle size={24} />
                </div>
                <span className="ml-2 text-xl font-bold text-white">TaskFlow</span>
              </a>
            </div>
            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
              &copy; 2025 TaskFlow, Inc. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <a href="#" className="text-xs text-gray-400 hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-300">Terms of Service</a>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-300">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
"use client";

import { MapPin, Phone, MessageSquare, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-24 pb-24 bg-primary-bg min-h-screen text-primary-accent">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16 mt-12">
          <h1 className="heading-luxury text-4xl md:text-5xl mb-4 uppercase text-primary-accent">GET IN TOUCH</h1>
          <p className="text-text-brown text-sm tracking-widest uppercase">We&apos;re here to help</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="heading-luxury text-2xl mb-8 uppercase border-b border-primary-accent/10 pb-4">Contact Information</h2>
              <div className="space-y-8">
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-secondary-bg border border-primary-accent/10 shrink-0 text-primary-accent rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="uppercase tracking-widest text-sm font-semibold mb-2">Phone</h3>
                    <p className="text-text-brown font-light">+91 6369726928</p>
                    <p className="text-primary-accent/40 text-sm mt-1">Mon-Sat 10am to 7pm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-secondary-bg border border-primary-accent/10 shrink-0 text-primary-accent rounded-lg">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="uppercase tracking-widest text-sm font-semibold mb-2">WhatsApp</h3>
                    <p className="text-text-brown font-light">+91 6369726928</p>
                    <a 
                      href="https://wa.me/916369726928?text=Hi%20there%2C%20I%20would%20like%20to%20know%20more." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 text-sm underline underline-offset-4 hover:text-secondary-accent transition-luxury inline-block text-primary-accent font-bold"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-secondary-bg border border-primary-accent/10 shrink-0 text-primary-accent rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="uppercase tracking-widest text-sm font-semibold mb-2">Location</h3>
                    <p className="text-text-brown font-light">UKKADAM Coimbatore</p>
                    <p className="text-primary-accent/40 text-sm mt-1">Pan India Delivery Available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-secondary-bg border border-primary-accent/10 shrink-0 text-primary-accent rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="uppercase tracking-widest text-sm font-semibold mb-2">Email</h3>
                    <p className="text-text-brown font-light">y4usecure@gmail.com</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-secondary-bg border border-primary-accent/10 p-8 md:p-12 rounded-2xl shadow-sm">
            <h2 className="heading-luxury text-2xl mb-8 uppercase text-primary-accent">Send an Inquiry</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs uppercase tracking-widest text-text-brown mb-2 font-bold">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-primary-bg border border-primary-accent/10 rounded-xl px-4 py-3 text-primary-accent focus:outline-none focus:border-secondary-accent transition-luxury placeholder-primary-accent/30"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-text-brown mb-2 font-bold">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-primary-bg border border-primary-accent/10 rounded-xl px-4 py-3 text-primary-accent focus:outline-none focus:border-secondary-accent transition-luxury placeholder-primary-accent/30"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-text-brown mb-2 font-bold">Message</label>
                <textarea 
                  rows={5}
                  className="w-full bg-primary-bg border border-primary-accent/10 rounded-xl px-4 py-3 text-primary-accent focus:outline-none focus:border-secondary-accent transition-luxury resize-none placeholder-primary-accent/30"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary-accent text-primary-bg py-4 uppercase tracking-widest font-semibold hover:bg-secondary-accent hover:text-primary-accent transition-luxury rounded-xl shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

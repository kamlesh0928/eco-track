import React from "react";
import { Leaf, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-background dark:bg-gray-900 border-t py-12">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-green-500 animate-pulse" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              EcoTrack
            </span>
          </div>
          <p className="text-muted-foreground dark:text-gray-300 mb-4">
            Our mission is to make it easier for everyone to track their
            environmental impact and make sustainable choices every day.
          </p>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Created during a hackathon | Powered by innovation and teamwork
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
          {[
            { name: "Home", path: "/home" },
            { name: "How It Works", path: "/how-it-works" },
            { name: "Leaderboard", path: "/leaderboard" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              className="block text-muted-foreground dark:text-gray-300 hover:text-green-500 mb-3 transition-colors"
            >
              {name}
            </Link>
          ))}
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-lg">Resources</h4>
          {["Help", "Privacy Policy", "Terms and Conditions", "FAQ"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="block text-muted-foreground dark:text-gray-300 hover:text-green-500 mb-3 transition-colors"
              >
                {item}
              </a>
            )
          )}
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-lg">Connect With Us</h4>
          <div className="flex gap-6 mb-6">
            {[Github, Twitter, Linkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="text-muted-foreground dark:text-gray-300 hover:text-green-500 transition-colors"
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <h4 className="font-semibold mb-4 text-lg">Stay Updated</h4>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-lg bg-muted dark:bg-gray-800 text-foreground dark:text-gray-100"
            />
            <Button className="bg-green-500 hover:bg-green-600">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t text-center">
        <p className="text-muted-foreground dark:text-gray-300">
          © {new Date().getFullYear()} EcoTrack. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground dark:text-gray-400 mt-2">
          Built with passion by the EcoTrack Team
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

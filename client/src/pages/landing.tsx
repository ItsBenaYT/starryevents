import { Navigation } from "@/components/Navigation";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiDiscord, SiX, SiYoutube } from "react-icons/si";
import { Star, Calendar, Users, Trophy } from "lucide-react";

export default function Landing() {
  const faqData = [
    {
      question: "How do I participate in events?",
      answer: "Simply connect your Discord account, and look for ongoing events. Click the 'Join Game' button on any active event to get the Roblox game link and start competing!"
    },
    {
      question: "How do I claim my Robux rewards?",
      answer: "Robux rewards are automatically credited to your account within 24-48 hours after the event concludes. You'll receive a notification in our Discord server when your reward is processed."
    },
    {
      question: "What are the requirements to join?",
      answer: "You need a Discord account and a Roblox account to participate. There are no skill requirements - events are designed for players of all levels to enjoy and compete fairly."
    },
    {
      question: "How often are new events created?",
      answer: "We host new events multiple times per week, including both scheduled competitions and surprise events. Follow our Discord announcements to stay updated on the latest opportunities to win Robux!"
    }
  ];

  return (
    <div className="min-h-screen space-bg">
      <ParticleBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent" data-testid="hero-title">
            Experience the Best Roblox Events
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="hero-subtitle">
            Participate in competitions, win Robux rewards, and connect with an amazing gaming community
          </p>
          <Button 
            onClick={() => window.location.href = '/api/login'}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl"
            data-testid="join-discord-cta"
          >
            <SiDiscord className="mr-2 h-5 w-5" />
            Join Discord Server
          </Button>
        </div>

        {/* Floating Robux Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="robux-icon absolute top-1/4 left-1/4 text-4xl opacity-20 animate-bounce">R$</div>
          <div className="robux-icon absolute top-1/3 right-1/4 text-3xl opacity-30 animate-pulse">R$</div>
          <div className="robux-icon absolute bottom-1/3 left-1/3 text-5xl opacity-15 animate-bounce" style={{animationDelay: '1s'}}>R$</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="features-title">
              Why Choose Starry Events?
            </h2>
            <p className="text-muted-foreground text-lg">The premier platform for competitive Roblox gaming</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-morphism border-0" data-testid="feature-events">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Premium Events</h3>
                <p className="text-muted-foreground">
                  Participate in high-quality Roblox competitions with substantial Robux prizes
                </p>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-0" data-testid="feature-community">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-accent text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Amazing Community</h3>
                <p className="text-muted-foreground">
                  Connect with thousands of Roblox players and make new friends
                </p>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-0" data-testid="feature-rewards">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="robux-icon text-2xl font-bold">R$</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Real Rewards</h3>
                <p className="text-muted-foreground">
                  Earn actual Robux that gets credited directly to your account
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent" data-testid="faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">Everything you need to know about participating</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
            {faqData.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass-morphism rounded-lg border-0"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="px-6 py-4 text-foreground hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" data-testid="support-title">
              Need Support?
            </h2>
            <p className="text-muted-foreground text-lg">We're here to help with any questions or issues</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Discord Support */}
            <Card className="glass-morphism border-0" data-testid="discord-support-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SiDiscord className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Discord Support</h3>
                <p className="text-muted-foreground mb-6">
                  Get instant help from our community moderators and support team
                </p>
                <Button 
                  onClick={() => window.open('https://discord.gg/starryevents', '_blank')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  data-testid="open-support-channel"
                >
                  <SiDiscord className="mr-2 h-4 w-4" />
                  Open Support Channel
                </Button>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="glass-morphism border-0" data-testid="contact-form-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">Quick Contact</h3>
                <form className="space-y-4" data-testid="contact-form">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Discord Username</label>
                    <input 
                      type="text" 
                      placeholder="YourUsername#1234" 
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      data-testid="input-discord-username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Issue Type</label>
                    <select 
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      data-testid="select-issue-type"
                    >
                      <option value="reward">Reward Issues</option>
                      <option value="event">Event Problems</option>
                      <option value="account">Account Issues</option>
                      <option value="general">General Question</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea 
                      rows={4} 
                      placeholder="Describe your issue..." 
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      data-testid="textarea-message"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 rounded-lg"
                    data-testid="submit-contact-form"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border relative z-10" data-testid="footer">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="text-accent text-2xl" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Starry Events
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                The premier platform for competitive Roblox gaming events with real Robux rewards. 
                Join thousands of players in epic competitions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-discord">
                  <SiDiscord className="text-xl" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-twitter">
                  <SiX className="text-xl" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-youtube">
                  <SiYoutube className="text-xl" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#events" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-events">Events</a></li>
                <li><a href="#ranking" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-rankings">Rankings</a></li>
                <li><a href="#faq" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-faq">FAQ</a></li>
                <li><a href="#support" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-support">Support</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-terms">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-privacy">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors" data-testid="footer-link-guidelines">Community Guidelines</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground" data-testid="copyright">
              © 2024 Starry Events. All rights reserved. Not affiliated with Roblox Corporation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

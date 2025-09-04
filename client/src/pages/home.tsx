import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { ParticleBackground } from "@/components/ParticleBackground";
import { EventCard } from "@/components/EventCard";
import { NotificationSystem } from "@/components/NotificationSystem";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Calendar, Star, Trophy } from "lucide-react";
import { SiDiscord, SiX, SiYoutube } from "react-icons/si";
import type { Event, User } from "@shared/schema";

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

export default function Home() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Fetch active events
  const { data: activeEvents = [], isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ['/api/events/active'],
  });

  // Fetch scheduled events
  const { data: scheduledEvents = [] } = useQuery<Event[]>({
    queryKey: ['/api/events/scheduled'],
  });

  // Fetch rankings
  const { data: topPlayers = [] } = useQuery<User[]>({
    queryKey: ['/api/rankings'],
  });

  // Join event mutation
  const joinEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      await apiRequest('POST', `/api/events/${eventId}/join`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Successfully joined the event!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to join event. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleJoinEvent = (eventId: string) => {
    joinEventMutation.mutate(eventId);
  };

  const addNotification = (message: string, type: Notification['type'] = 'info') => {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      type,
    };
    setNotifications(prev => [...prev, notification]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Example notifications (would be triggered by real events)
  useEffect(() => {
    const timer1 = setTimeout(() => {
      addNotification('Welcome to Starry Events! Check out our ongoing competitions.', 'info');
    }, 3000);

    const timer2 = setTimeout(() => {
      addNotification('New event "Building Competition" has been scheduled!', 'success');
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const faqData = [
    {
      question: "How do I participate in events?",
      answer: "Simply look for ongoing events below. Click the 'Join Game' button on any active event to get the Roblox game link and start competing!"
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
      answer: "We host new events multiple times per week, including both scheduled competitions and surprise events. Follow our Discord announcements to stay updated!"
    }
  ];

  return (
    <div className="min-h-screen space-bg">
      <ParticleBackground />
      <Navigation />
      <NotificationSystem 
        notifications={notifications} 
        onDismiss={dismissNotification} 
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent" data-testid="hero-title">
            Welcome to Starry Events
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="hero-subtitle">
            Jump into active competitions and start earning Robux rewards
          </p>
          <Button 
            onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl"
            data-testid="view-events-cta"
          >
            View Active Events
          </Button>
        </div>

        {/* Floating Robux Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="robux-icon absolute top-1/4 left-1/4 text-4xl opacity-20 animate-bounce">R$</div>
          <div className="robux-icon absolute top-1/3 right-1/4 text-3xl opacity-30 animate-pulse">R$</div>
          <div className="robux-icon absolute bottom-1/3 left-1/3 text-5xl opacity-15 animate-bounce" style={{animationDelay: '1s'}}>R$</div>
        </div>
      </section>

      {/* Ongoing Events */}
      <section id="events" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="ongoing-events-title">
              Ongoing Events
            </h2>
            <p className="text-muted-foreground text-lg">Jump into active competitions and start earning rewards</p>
          </div>

          {eventsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-morphism rounded-xl p-6 animate-pulse" data-testid={`event-skeleton-${i}`}>
                  <div className="w-full h-40 bg-muted rounded-lg mb-4"></div>
                  <div className="space-y-4">
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="h-8 bg-muted rounded w-1/2"></div>
                    <div className="h-16 bg-muted rounded"></div>
                    <div className="h-10 bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : activeEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" data-testid="active-events-grid">
              {activeEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onJoinEvent={handleJoinEvent}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12" data-testid="no-active-events">
              <Trophy className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Active Events</h3>
              <p className="text-muted-foreground">Check back soon for new competitions!</p>
            </div>
          )}

          {/* Scheduled Events */}
          {scheduledEvents.length > 0 && (
            <>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4 text-foreground" data-testid="scheduled-events-title">Scheduled Events</h3>
                <p className="text-muted-foreground">Don't miss upcoming competitions</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="scheduled-events-grid">
                {scheduledEvents.map((event) => (
                  <Card key={event.id} className="glass-morphism border-0" data-testid={`scheduled-event-${event.id}`}>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={event.imageUrl || "https://via.placeholder.com/64x64?text=Event"} 
                          alt={event.title}
                          className="w-16 h-16 rounded-lg object-cover"
                          data-testid="scheduled-event-image"
                        />
                        <div>
                          <h4 className="font-bold text-foreground" data-testid="scheduled-event-title">
                            {event.title}
                          </h4>
                          <p className="text-sm text-muted-foreground" data-testid="scheduled-event-time">
                            {new Date(event.startTime).toLocaleDateString()} • {new Date(event.startTime).toLocaleTimeString()}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            <span className="robux-icon text-lg">R$</span>
                            <span className="font-bold text-accent" data-testid="scheduled-event-prize">
                              {event.robuxPrize.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-sm font-semibold"
                        data-testid="add-to-calendar"
                      >
                        <Calendar className="mr-1 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Rankings */}
      <section id="ranking" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent" data-testid="rankings-title">
              Player Rankings
            </h2>
            <p className="text-muted-foreground text-lg">Top performers and Robux earners</p>
          </div>

          <Card className="glass-morphism border-0 overflow-hidden" data-testid="rankings-table">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary/20 to-secondary/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Player</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Discord</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Robux Earned</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Events Won</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {topPlayers.length > 0 ? (
                    topPlayers.map((player, index: number) => (
                      <tr key={player.id} className="hover:bg-muted/20 transition-colors" data-testid={`player-row-${index}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-2xl">
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}
                            </span>
                            <span className={`ml-2 font-bold ${index < 3 ? 'text-accent' : 'text-muted-foreground'}`} data-testid={`player-rank-${index}`}>
                              {index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage 
                                src={player.profileImageUrl || ''} 
                                alt="Player Avatar"
                                data-testid={`player-avatar-${index}`}
                              />
                              <AvatarFallback data-testid={`player-avatar-fallback-${index}`}>
                                {player.robloxUsername?.charAt(0) || player.discordUsername?.charAt(0) || 'P'}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-semibold text-foreground" data-testid={`player-name-${index}`}>
                              {player.robloxUsername || player.discordUsername || 'Anonymous'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-muted-foreground" data-testid={`player-discord-${index}`}>
                            {player.discordUsername || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <span className="robux-icon text-lg">R$</span>
                            <span className="font-bold text-accent" data-testid={`player-robux-${index}`}>
                              {player.totalRobuxEarned?.toLocaleString() || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-foreground" data-testid={`player-events-won-${index}`}>
                            {player.eventsWon || 0}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground" data-testid="no-rankings">
                        No rankings available yet. Be the first to win an event!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
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

      {/* Support */}
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

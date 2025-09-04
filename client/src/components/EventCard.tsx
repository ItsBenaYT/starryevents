import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Gamepad2 } from "lucide-react";
import type { Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
  onJoinEvent?: (eventId: string) => void;
  isParticipant?: boolean;
}

export function EventCard({ event, onJoinEvent, isParticipant }: EventCardProps) {
  const handleJoinGame = () => {
    if (event.gameUrl) {
      window.open(event.gameUrl, '_blank');
    }
    if (onJoinEvent && !isParticipant) {
      onJoinEvent(event.id);
    }
  };

  const isActive = new Date() >= new Date(event.startTime) && new Date() <= new Date(event.endTime);

  return (
    <div className="event-card glass-morphism rounded-xl p-6 cursor-pointer group" data-testid={`event-card-${event.id}`}>
      <img 
        src={event.imageUrl || "https://via.placeholder.com/400x200?text=Event+Image"} 
        alt={event.title}
        className="w-full h-40 object-cover rounded-lg mb-4"
        data-testid="event-image"
      />
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground" data-testid="event-title">
          {event.title}
        </h3>
        
        {event.description && (
          <p className="text-sm text-muted-foreground" data-testid="event-description">
            {event.description}
          </p>
        )}
        
        {/* Robux Prize */}
        <div className="flex items-center space-x-2" data-testid="event-prize">
          <span className="robux-icon text-2xl font-bold">R$</span>
          <span className="text-2xl font-bold text-accent">{event.robuxPrize.toLocaleString()}</span>
          <span className="text-muted-foreground">Prize Pool</span>
        </div>

        {/* Countdown Timer */}
        {isActive && (
          <CountdownTimer endTime={event.endTime.toISOString()} />
        )}

        {/* Participants */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span data-testid="participants-count">
            {event.currentParticipants || 0} participants
          </span>
          {event.maxParticipants && (
            <span data-testid="max-participants">
              Max: {event.maxParticipants}
            </span>
          )}
        </div>

        {/* Join Game Button */}
        <Button 
          onClick={handleJoinGame}
          className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground font-bold py-3 rounded-lg transition-all transform group-hover:scale-105"
          disabled={!isActive}
          data-testid="join-game-button"
        >
          <Gamepad2 className="mr-2 h-4 w-4" />
          {isActive ? "Join Game" : "Event Ended"}
        </Button>
      </div>
    </div>
  );
}

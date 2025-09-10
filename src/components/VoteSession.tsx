import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { useVoteContract, useCreateVoteSession } from '@/hooks/useContract';
import { Vote, Clock, Users, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface VoteOption {
  id: number;
  name: string;
  description: string;
}

interface VoteSessionProps {
  sessionId?: number;
}

export const VoteSession = ({ sessionId }: VoteSessionProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(7); // days
  const [options, setOptions] = useState<VoteOption[]>([]);
  const [newOptionName, setNewOptionName] = useState('');
  const [newOptionDescription, setNewOptionDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const { createSession, isLoading } = useCreateVoteSession();

  const handleCreateSession = async () => {
    if (!title || !description || options.length < 2) {
      toast.error('Please fill in all fields and add at least 2 options');
      return;
    }

    setIsCreating(true);
    try {
      const durationInSeconds = duration * 24 * 60 * 60; // Convert days to seconds
      
      // Call the contract function
      await createSession(title, description, durationInSeconds);
      
      toast.success('Vote session created successfully!');
      
      // Reset form
      setTitle('');
      setDescription('');
      setDuration(7);
      setOptions([]);
    } catch (error) {
      console.error('Error creating vote session:', error);
      toast.error('Failed to create vote session');
    } finally {
      setIsCreating(false);
    }
  };

  const addOption = () => {
    if (!newOptionName.trim()) {
      toast.error('Option name cannot be empty');
      return;
    }

    const newOption: VoteOption = {
      id: options.length + 1,
      name: newOptionName,
      description: newOptionDescription,
    };

    setOptions([...options, newOption]);
    setNewOptionName('');
    setNewOptionDescription('');
  };

  const removeOption = (id: number) => {
    setOptions(options.filter(option => option.id !== id));
  };

  if (sessionId) {
    // Display existing vote session
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5" />
                Vote Session #{sessionId}
              </CardTitle>
              <CardDescription>
                Cast your encrypted vote securely
              </CardDescription>
            </div>
            <Badge variant="outline" className="holographic-border">
              <Shield className="h-3 w-3 mr-1" />
              FHE Secured
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-muted-foreground">
                This vote session is secured with Fully Homomorphic Encryption.
                Your vote will remain completely private.
              </p>
            </div>
            {/* Vote options would be displayed here */}
            <div className="text-center text-muted-foreground">
              Vote options will be loaded from the contract...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Create new vote session
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Vote className="h-5 w-5" />
          Create New Vote Session
        </CardTitle>
        <CardDescription>
          Create a secure voting session with FHE encryption
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Session Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter vote session title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what this vote is about"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (days)</Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min="1"
            max="365"
          />
        </div>

        <div className="space-y-4">
          <Label>Vote Options</Label>
          <div className="space-y-2">
            <Input
              value={newOptionName}
              onChange={(e) => setNewOptionName(e.target.value)}
              placeholder="Option name"
            />
            <Input
              value={newOptionDescription}
              onChange={(e) => setNewOptionDescription(e.target.value)}
              placeholder="Option description (optional)"
            />
            <Button onClick={addOption} variant="outline" size="sm">
              Add Option
            </Button>
          </div>

          {options.length > 0 && (
            <div className="space-y-2">
              {options.map((option) => (
                <div key={option.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">{option.name}</p>
                    {option.description && (
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    )}
                  </div>
                  <Button
                    onClick={() => removeOption(option.id)}
                    variant="ghost"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Duration: {duration} day{duration !== 1 ? 's' : ''}</span>
          <Users className="h-4 w-4 ml-4" />
          <span>Options: {options.length}</span>
        </div>

        <Button
          onClick={handleCreateSession}
          disabled={isLoading || isCreating || !title || !description || options.length < 2}
          className="w-full"
        >
          {isLoading || isCreating ? 'Creating...' : 'Create Vote Session'}
        </Button>
      </CardContent>
    </Card>
  );
};

import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Vote, Users, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Results = () => {
  // Mock data for demonstration
  const mockSessions = [
    {
      id: 1,
      title: "Community Governance Proposal",
      description: "Vote on the new community guidelines",
      totalVotes: 156,
      options: [
        { name: "Approve", votes: 89 },
        { name: "Reject", votes: 67 }
      ],
      status: "Completed",
      endTime: "2024-01-15"
    },
    {
      id: 2,
      title: "Platform Feature Request",
      description: "Which new feature should we prioritize?",
      totalVotes: 203,
      options: [
        { name: "Mobile App", votes: 78 },
        { name: "API Integration", votes: 65 },
        { name: "Advanced Analytics", votes: 60 }
      ],
      status: "Completed",
      endTime: "2024-01-10"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">
              Voting Results
            </h1>
            <p className="text-gray-300">
              View results from completed voting sessions
            </p>
          </div>

          <div className="grid gap-6">
            {mockSessions.map((session) => (
              <Card key={session.id} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-xl mb-2">
                        {session.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 mb-4">
                        {session.description}
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
                    {/* Session Stats */}
                    <div className="flex items-center gap-6 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{session.totalVotes} total votes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Ended: {session.endTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Vote className="h-4 w-4" />
                        <span>Status: {session.status}</span>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-3">
                      <h4 className="text-white font-medium">Results:</h4>
                      {session.options.map((option, index) => {
                        const percentage = (option.votes / session.totalVotes) * 100;
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">{option.name}</span>
                              <span className="text-white font-medium">
                                {option.votes} votes ({percentage.toFixed(1)}%)
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state for when no results exist */}
          {mockSessions.length === 0 && (
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="text-center py-12">
                <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">
                  No Results Yet
                </h3>
                <p className="text-gray-300 mb-6">
                  Voting session results will appear here once sessions are completed.
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                >
                  <Vote className="h-5 w-5" />
                  Create First Session
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Results;

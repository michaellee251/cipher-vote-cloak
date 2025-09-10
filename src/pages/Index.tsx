import Header from "@/components/Header";
import { VoteSession } from "@/components/VoteSession";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Vote, Lock, Plus } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {!showCreateForm ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Secure Voting with FHE Technology
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Experience the future of privacy-preserving voting with fully homomorphic encryption.
                Your votes remain completely private while maintaining transparency and verifiability.
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                <Plus className="h-5 w-5" />
                Create New Vote Session
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <Vote className="h-8 w-8 text-green-400 mb-2" />
                  <CardTitle className="text-white">Private Voting</CardTitle>
                  <CardDescription className="text-gray-300">
                    Cast your votes with complete privacy using FHE encryption
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <Lock className="h-8 w-8 text-blue-400 mb-2" />
                  <CardTitle className="text-white">Secure Results</CardTitle>
                  <CardDescription className="text-gray-300">
                    Results are computed without revealing individual votes
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <Shield className="h-8 w-8 text-purple-400 mb-2" />
                  <CardTitle className="text-white">Transparent</CardTitle>
                  <CardDescription className="text-gray-300">
                    Verify the integrity of the voting process on-chain
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-white transition-colors mb-4"
              >
                ← Back to Home
              </button>
            </div>
            <VoteSession />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

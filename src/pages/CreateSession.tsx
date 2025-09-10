import Header from "@/components/Header";
import { VoteSession } from "@/components/VoteSession";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CreateSession = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">
              Create New Vote Session
            </h1>
            <p className="text-gray-300">
              Create a secure voting session with FHE encryption
            </p>
          </div>
          
          <VoteSession />
        </div>
      </main>
    </div>
  );
};

export default CreateSession;

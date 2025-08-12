import { Card } from "@/components/ui/card";
import {
  Shield,
  Heart,
  Award,
  Users,
  Target,
  Sparkles,
  Globe,
  Lock,
} from "lucide-react";

const missions = [
  {
    icon: <Heart className="w-8 h-8 text-primary" />,
    title: "Our Mission",
    description:
      "To democratize access to mental health support through ethical AI and blockchain technology, making quality therapeutic care available to everyone, everywhere, at any time.",
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Our Vision",
    description:
      "A world where mental health support is accessible, private, and personalized, powered by trusted AI agents and secured by blockchain technology.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: "Our Values",
    description:
      "Privacy, Innovation, Empathy, and Trust form the cornerstone of our platform, ensuring the highest standards of care and security.",
  },
];

const achievements = [
  {
    icon: <Users className="w-6 h-6" />,
    number: "10,000+",
    label: "Active Users",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    number: "50+",
    label: "Countries",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    number: "100%",
    label: "Data Privacy",
  },
  {
    icon: <Award className="w-6 h-6" />,
    number: "5+",
    label: "Industry Awards",
  },
];

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief AI Ethics Officer",
    image: "/team/sarah.jpg",
  },
  {
    name: "Michael Rodriguez",
    role: "Blockchain Architect",
    image: "/team/michael.jpg",
  },
  {
    name: "Dr. Emily Watson",
    role: "Mental Health Director",
    image: "/team/emily.jpg",
  },
  {
    name: "James Park",
    role: "AI Research Lead",
    image: "/team/james.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="text-center mb-20 animate-fade-in">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          About Aura3.0
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're revolutionizing mental health support by combining cutting-edge
          AI technology with the security and transparency of blockchain.
        </p>
      </div>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {missions.map((mission, index) => (
          <div
            key={mission.title}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Card className="p-6 text-center h-full bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
              <div className="mb-4 flex justify-center">{mission.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{mission.title}</h3>
              <p className="text-muted-foreground">{mission.description}</p>
            </Card>
          </div>
        ))}
      </div>

      {/* Achievements Section */}
      <div className="text-center mb-20 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Our Impact
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.label}
              className="animate-fade-in-up"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <div className="text-3xl font-bold text-primary mb-2">
                {achievement.number}
              </div>
              <div className="text-muted-foreground">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

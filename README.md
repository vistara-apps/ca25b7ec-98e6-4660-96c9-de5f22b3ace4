# EchoSphere - Base MiniApp

Find your people, share your journey. A Base MiniApp connecting lonely individuals through peer support groups, shared activities, and AI companionship.

## Features

### 🤝 Curated Peer Support Groups
- Join or create small, private groups focused on specific topics
- Safe spaces for genuine peer support and understanding
- Moderated discussions with group leaders

### 🎯 Activity-Based Social Matching
- Connect through shared interests and activities
- Virtual coffee chats, book clubs, gaming sessions, and more
- Planned activities with like-minded individuals

### 🤖 AI Companion for Daily Check-ins
- Empathetic AI companion available 24/7
- Daily prompts for reflection and emotional processing
- Supportive affirmations and guided conversations

### 🧠 Skill-Building for Social Confidence
- Interactive modules for communication skills
- AI coaching for empathy and active listening
- Progress tracking and achievements

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Base Integration**: MiniKit + OnchainKit
- **AI**: OpenAI API for companion functionality
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/echosphere.git
   cd echosphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `OPENAI_API_KEY`: Your OpenAI API key for AI companion

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in Base App**
   Navigate to `http://localhost:3000` in Base App or compatible Farcaster client

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main app component
│   ├── providers.tsx      # MiniKit and OnchainKit providers
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── BaseShell.tsx      # Main app shell
│   ├── WelcomeScreen.tsx  # Onboarding screen
│   ├── Dashboard.tsx      # Main dashboard
│   ├── GroupsView.tsx     # Support groups interface
│   ├── ActivitiesView.tsx # Activities interface
│   ├── AICompanionView.tsx# AI companion chat
│   └── SkillsView.tsx     # Skill building modules
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript type definitions
│   ├── utils.ts           # Utility functions
│   └── constants.ts       # App constants
└── public/               # Static assets
    └── manifest.json     # Base MiniApp manifest
```

## Base MiniApp Features

- **Frame Integration**: Runs seamlessly within Base App
- **Farcaster Identity**: Uses existing social identity for onboarding
- **Notifications**: Daily check-in reminders and group updates
- **Social Sharing**: Share groups and activities with friends
- **Micro-transactions**: Optional premium features and virtual gifts

## Design System

The app uses a cohesive design system with:
- **Colors**: Blue gradient theme matching Base branding
- **Typography**: Clean, readable fonts optimized for mobile
- **Components**: Reusable UI components with consistent styling
- **Motion**: Smooth transitions and micro-interactions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@echosphere.app or join our community Discord.

---

Built with ❤️ for the Base ecosystem

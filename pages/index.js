import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

const commands = {
  help: () => `
Available commands:
  help          - Show this help message
  about         - Learn about Abdul Salam
  skills        - View technical skills
  projects      - See featured projects
  contact       - Get contact information
  education     - View educational background
  experience    - View work experience
  clear         - Clear the terminal
  date          - Show current date and time
  whoami        - Display current user
  ls            - List available sections
  cat <file>    - View specific file content
  echo <text>   - Echo back text
  fortune       - Get a random quote
`,
  about: () => `
╔══════════════════════════════════════════════════════════════╗
║                     ABDUL SALAM                              ║
╠══════════════════════════════════════════════════════════════╣
║  Full Stack Developer | Problem Solver | Tech Enthusiast     ║
╚══════════════════════════════════════════════════════════════╝

Hello! I'm Abdul Salam, a passionate software developer dedicated
to creating elegant solutions to complex problems.

I specialize in building modern web applications with a focus on
clean code, scalability, and exceptional user experiences.

Type 'skills' to see my technical expertise or 'projects' to 
view my work.
`,
  skills: () => `
┌─────────────────────────────────────────────────────────────┐
│                    TECHNICAL SKILLS                         │
└─────────────────────────────────────────────────────────────┘

Frontend Development:
  ████████████████████░░░░  JavaScript/TypeScript  90%
  ███████████████████░░░░░  React.js               85%
  ██████████████████░░░░░░  Next.js                80%
  █████████████████░░░░░░░  HTML5/CSS3             75%
  ████████████████░░░░░░░░  Vue.js                 70%

Backend Development:
  ███████████████████░░░░░  Node.js                85%
  ██████████████████░░░░░░  Python                 80%
  █████████████████░░░░░░░  Express.js             75%
  ████████████████░░░░░░░░  REST APIs              70%

Database & Tools:
  ███████████████████░░░░░  MongoDB                85%
  ██████████████████░░░░░░  PostgreSQL             80%
  █████████████████░░░░░░░  Git/GitHub             75%
  ████████████████░░░░░░░░  Docker                 70%
`,
  projects: () => `
┌─────────────────────────────────────────────────────────────┐
│                    FEATURED PROJECTS                        │
└─────────────────────────────────────────────────────────────┘

[1] E-Commerce Platform
    └── Full-stack shopping platform with React & Node.js
    └── Features: Auth, Payments, Admin Dashboard
    └── Tech: React, Node.js, MongoDB, Stripe

[2] Task Management App
    └── Collaborative project management tool
    └── Features: Real-time updates, Team collaboration
    └── Tech: Next.js, Socket.io, PostgreSQL

[3] Portfolio CLI (This Website!)
    └── Interactive terminal-style portfolio
    └── Features: Command-line interface in browser
    └── Tech: Next.js, React, CSS

[4] API Gateway Service
    └── Microservices API management system
    └── Features: Rate limiting, Authentication
    └── Tech: Node.js, Redis, Docker

Type 'contact' to get in touch about collaboration!
`,
  contact: () => `
┌─────────────────────────────────────────────────────────────┐
│                    CONTACT INFO                             │
└─────────────────────────────────────────────────────────────┘

  📧 Email:     abdul.salam@example.com
  💼 LinkedIn:  linkedin.com/in/abdulsalam
  🐙 GitHub:    github.com/abdulsalam
  🌐 Website:   abdulsalam.dev
  📍 Location:  Available for Remote Work

Feel free to reach out for collaborations, opportunities,
or just to say hello!

Type 'about' to learn more about me.
`,
  education: () => `
┌─────────────────────────────────────────────────────────────┐
│                    EDUCATION                                │
└─────────────────────────────────────────────────────────────┘

🎓 Bachelor's in Computer Science
   └── University of Technology
   └── 2018 - 2022
   └── GPA: 3.8/4.0
   └── Relevant Coursework: Data Structures, Algorithms,
       Web Development, Database Systems

📜 Certifications:
   └── AWS Certified Developer
   └── MongoDB Certified Developer
   └── Google Cloud Professional
`,
  experience: () => `
┌─────────────────────────────────────────────────────────────┐
│                    WORK EXPERIENCE                          │
└─────────────────────────────────────────────────────────────┘

💼 Senior Software Developer
   Company: Tech Solutions Inc.
   Period:  2022 - Present
   └── Led development of microservices architecture
   └── Mentored junior developers
   └── Reduced deployment time by 40%

💼 Software Developer
   Company: Digital Innovations
   Period:  2020 - 2022
   └── Developed responsive web applications
   └── Implemented CI/CD pipelines
   └── Collaborated with cross-functional teams

💼 Junior Developer (Intern)
   Company: StartUp Hub
   Period:  2019 - 2020
   └── Built RESTful APIs
   └── Participated in code reviews
   └── Learned agile methodologies
`,
  clear: () => 'CLEAR',
  date: () => new Date().toLocaleString(),
  whoami: () => 'guest@abdul-salam-cli',
  ls: () => `
about.txt    skills.txt    projects.txt    contact.txt
education.txt    experience.txt    README.md
`,
  fortune: () => {
    const quotes = [
      '"The only way to do great work is to love what you do." - Steve Jobs',
      '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
      '"First, solve the problem. Then, write the code." - John Johnson',
      '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
      '"The best error message is the one that never shows up." - Thomas Fuchs',
      '"Programming is thinking, not typing." - Casey Patton',
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  },
};

export default function Home() {
  const [history, setHistory] = useState([
    { type: 'output', content: `
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     █████╗ ██████╗ ██████╗ ██╗   ██╗██╗                      ║
║    ██╔══██╗██╔══██╗██╔══██╗██║   ██║██║                      ║
║    ███████║██████╔╝██║  ██║██║   ██║██║                      ║
║    ██╔══██║██╔══██╗██║  ██║██║   ██║██║                      ║
║    ██║  ██║██████╔╝██████╔╝╚██████╔╝███████╗                 ║
║    ╚═╝  ╚═╝╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝                 ║
║                                                               ║
║    ███████╗ █████╗ ██╗      █████╗ ███╗   ███╗               ║
║    ██╔════╝██╔══██╗██║     ██╔══██╗████╗ ████║               ║
║    ███████╗███████║██║     ███████║██╔████╔██║               ║
║    ╚════██║██╔══██║██║     ██╔══██║██║╚██╔╝██║               ║
║    ███████║██║  ██║███████╗██║  ██║██║ ╚═╝ ██║               ║
║    ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝               ║
║                                                               ║
║              Interactive Portfolio CLI v1.0.0                 ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

Welcome to Abdul Salam's Interactive CLI Portfolio!

Type 'help' to see available commands.
` }
  ]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1).join(' ');

    let output = '';

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    if (command === 'cat') {
      const fileMap = {
        'about.txt': 'about',
        'skills.txt': 'skills',
        'projects.txt': 'projects',
        'contact.txt': 'contact',
        'education.txt': 'education',
        'experience.txt': 'experience',
        'readme.md': 'about',
      };
      const file = args.toLowerCase();
      if (fileMap[file]) {
        output = commands[fileMap[file]]();
      } else {
        output = `cat: ${args}: No such file or directory`;
      }
    } else if (command === 'echo') {
      output = args || '';
    } else if (commands[command]) {
      output = commands[command]();
    } else if (command === '') {
      output = '';
    } else {
      output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', content: cmd },
      { type: 'output', content: output }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <Head>
        <title>Abdul Salam | CLI Portfolio</title>
        <meta name="description" content="Interactive CLI Portfolio of Abdul Salam - Full Stack Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="container" onClick={handleTerminalClick}>
        <div className="terminal">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="btn-close"></span>
              <span className="btn-minimize"></span>
              <span className="btn-maximize"></span>
            </div>
            <div className="terminal-title">abdul-salam@portfolio: ~</div>
          </div>
          <div className="terminal-body" ref={terminalRef}>
            {history.map((item, index) => (
              <div key={index} className={`terminal-line ${item.type}`}>
                {item.type === 'input' ? (
                  <><span className="prompt">guest@abdul-salam-cli:~$</span> {item.content}</>
                ) : (
                  <pre>{item.content}</pre>
                )}
              </div>
            ))}
            <div className="input-line">
              <span className="prompt">guest@abdul-salam-cli:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                autoFocus
                spellCheck="false"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          min-height: 100vh;
          font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .container {
          width: 100%;
          max-width: 900px;
          height: 90vh;
          max-height: 700px;
        }

        .terminal {
          background: #0d1117;
          border-radius: 10px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5),
                      0 0 0 1px rgba(255, 255, 255, 0.1);
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .terminal-header {
          background: linear-gradient(180deg, #2d2d2d 0%, #1f1f1f 100%);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #333;
        }

        .terminal-buttons {
          display: flex;
          gap: 8px;
        }

        .terminal-buttons span {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }

        .btn-close {
          background: #ff5f56;
        }

        .btn-minimize {
          background: #ffbd2e;
        }

        .btn-maximize {
          background: #27ca40;
        }

        .terminal-title {
          flex: 1;
          text-align: center;
          color: #888;
          font-size: 13px;
        }

        .terminal-body {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          color: #e6e6e6;
          font-size: 14px;
          line-height: 1.6;
        }

        .terminal-body::-webkit-scrollbar {
          width: 8px;
        }

        .terminal-body::-webkit-scrollbar-track {
          background: #0d1117;
        }

        .terminal-body::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }

        .terminal-line {
          margin-bottom: 4px;
        }

        .terminal-line.input {
          color: #58a6ff;
        }

        .terminal-line pre {
          white-space: pre-wrap;
          word-wrap: break-word;
          font-family: inherit;
          margin: 0;
          color: #7ee787;
        }

        .prompt {
          color: #f778ba;
          margin-right: 8px;
        }

        .input-line {
          display: flex;
          align-items: center;
        }

        .terminal-input {
          background: transparent;
          border: none;
          outline: none;
          color: #e6e6e6;
          font-family: inherit;
          font-size: 14px;
          flex: 1;
          caret-color: #7ee787;
        }

        .terminal-input::selection {
          background: #264f78;
        }

        @media (max-width: 768px) {
          .container {
            height: 95vh;
            max-height: none;
          }

          .terminal-body {
            font-size: 12px;
          }

          .terminal-input {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}

import { Github, Linkedin, Mail, Terminal, Code2, Users, User } from "lucide-react";
import Image from "next/image";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

export default async function Home() {
  const orgName = "Core-Syntax-Labs";
  const userName = "rafxys";

  // Busca e Filtra projetos da Organização
  const orgRes = await fetch(`https://api.github.com/orgs/${orgName}/repos?sort=updated&per_page=15`, {
    next: { revalidate: 3600 }
  });
  const allOrgRepos: Repository[] = orgRes.ok ? await orgRes.json() : [];
  
  // Filtra o repo de README da org (geralmente ".github" ou o próprio nome da org)
  const orgRepos = allOrgRepos.filter(repo => 
    repo.name.toLowerCase() !== ".github" && 
    repo.name.toLowerCase() !== orgName.toLowerCase()
  );

  
  // Busca projetos Pessoais
  const userRes = await fetch(`https://api.github.com/users/${userName}/repos?sort=updated&per_page=5`, {
    next: { revalidate: 3600 }
  });
  //Filtro para não aparecer os README
  const allUserRepos: Repository[] = userRes.ok ? await userRes.json() : [];
  const personalRepos = allUserRepos.filter(repo => repo.name.toLowerCase() !== userName.toLowerCase());

  const skills = ["React", "NextJS", "Vite", "CSS", "TailwindCSS", "HTML", "Javascript", "Typescript", "Python", "NodeJS", "MySQL", "PowerBI"];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <main className="mx-auto max-w-3xl px-6 py-20 lg:py-32">
        
        {/* Header / Intro */}
        <section className="flex flex-col-reverse items-start justify-between gap-8 sm:flex-row">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Rafael Galvão</h1>
              <h2 className="mt-2 inline-block font-mono text-xl font-bold uppercase tracking-widest text-blue-600 animate-[pulse_1.5s_infinite] drop-shadow-[0_0_8px_rgba(37,99,235,0.5)] dark:text-red-400">
                &gt; DEV Full-stack <span className="animate-bounce">_</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-0.5 text-xs font-semibold shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800">
                  <Terminal size={12} className="text-red-500" />
                  {skill}
                </span>
              ))}
            </div>
            <p className="mt-2 max-w-md leading-7 text-zinc-600 dark:text-zinc-400">
              Atualmente focado em React, Next.js e explorando o mundo de Data Science. Membro da <span className="font-bold text-zinc-900 dark:text-zinc-100">Core Syntax Labs</span>.
            </p>
          </div>

          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-2 border-zinc-200 shadow-xl dark:border-red-800 sm:h-40 sm:w-40">
            <Image src="https://avatars.githubusercontent.com/u/179970243?v=4" alt="Foto de Rafael Galvão" fill className="object-cover" priority />
          </div>
        </section>

        <hr className="my-12 border-zinc-200 dark:border-zinc-800" />

        {/* PROJETOS DA ORGANIZAÇÃO */}
        <section className="space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="inline-block font-mono text-xl font-bold uppercase tracking-widest text-blue-600 animate-[pulse_1.5s_infinite] drop-shadow-[0_0_8px_rgba(37,99,235,0.5)] dark:text-red-400">
              &gt; TEAM_PROJECTS <span className="animate-bounce">_</span>
            </h2>
            <p className="text-xs text-zinc-500 flex items-center gap-1 font-mono uppercase tracking-tighter">
              <Users size={12} /> Core-Syntax-Labs repositories
            </p>
          </div>
          <RepoList repos={orgRepos} />
        </section>

        <div className="h-20" /> {/* Espaçador */}

        {/* PROJETOS PESSOAIS */}
        <section className="space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="inline-block font-mono text-xl font-bold uppercase tracking-widest text-blue-600 animate-[pulse_1.5s_infinite] drop-shadow-[0_0_8px_rgba(37,99,235,0.5)] dark:text-red-400">
              &gt; PERSONAL_PROJECTS <span className="animate-bounce">_</span>
            </h2>
            <p className="text-xs text-zinc-500 flex items-center gap-1 font-mono uppercase tracking-tighter">
              <User size={12} /> Individual repositories
            </p>
          </div>
          <RepoList repos={personalRepos} />
        </section>

        <hr className="my-12 border-zinc-200 dark:border-zinc-800" />

        {/* Rodapé */}
        <footer className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/rafael-alexandre-7b9705333/" target="_blank" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href="https://github.com/rafxys" target="_blank" className="flex items-center gap-2 hover:text-zinc-500 transition-colors">
              <Github size={18} /> GitHub
            </a>
            <a href="mailto:rafaelgalvaodev@gmail.com" className="flex items-center gap-2 hover:text-red-500 transition-colors">
              <Mail size={18} /> Email
            </a>
          </div>
          <p className="text-xs text-zinc-500 font-mono">© {new Date().getFullYear()} RAFAEL_GALVÃO.SYS</p>
        </footer>
      </main>
    </div>
  );
}

// Sub-componente para evitar repetição de código
function RepoList({ repos }: { repos: Repository[] }) {
  if (repos.length === 0) {
    return (
      <div className="p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center">
        <p className="text-zinc-500 font-mono text-xs uppercase">No public data found_</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {repos.map((repo) => (
        <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl border border-zinc-200 p-6 transition-all hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900 shadow-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium group-hover:underline flex items-center gap-2">
                <Code2 size={18} className="text-blue-600 dark:text-red-500" />
                {repo.name}
              </h4>
              <div className="flex items-center gap-3 text-sm text-zinc-500 font-mono">
                <span>{new Date(repo.updated_at).getFullYear()}</span>
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 italic">
              {repo.description || "Project metadata stored on GitHub cloud_"}
            </p>
            {repo.language && (
              <div className="mt-2 flex">
                <span className="rounded-md border border-zinc-300 dark:border-zinc-700 px-2 py-1 text-[10px] font-bold uppercase dark:bg-zinc-800 font-mono tracking-tighter">
                  {repo.language}
                </span>
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
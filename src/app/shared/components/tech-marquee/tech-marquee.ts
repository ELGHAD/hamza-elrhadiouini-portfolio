import { Component } from '@angular/core';
import {
  type SimpleIcon,
  siAngular,
  siApachekafka,
  siApachemaven,
  siDart,
  siDjango,
  siDocker,
  siFastapi,
  siFlask,
  siFlutter,
  siGit,
  siGithub,
  siGithubactions,
  siGradle,
  siGraphql,
  siHibernate,
  siJavascript,
  siJira,
  siJsonwebtokens,
  siJunit5,
  siJupyter,
  siKeras,
  siKotlin,
  siLangchain,
  siLaravel,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siNumpy,
  siOpencv,
  siOpenjdk,
  siPandas,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siRedis,
  siScikitlearn,
  siSpringboot,
  siSpringsecurity,
  siSqlite,
  siSupabase,
  siSwagger,
  siSymfony,
  siTailwindcss,
  siTensorflow,
  siTerraform,
  siTypescript,
  siVite,
} from 'simple-icons';

interface Tech {
  name: string;
  icon: SimpleIcon;
}

/**
 * Only technologies listed in skills.data.ts (each one backed by a project, an internship
 * or a certificate). Logos from Simple Icons, drawn in the text colour.
 */
const BUILD: Tech[] = [
  { name: 'Java', icon: siOpenjdk },
  { name: 'Spring Boot', icon: siSpringboot },
  { name: 'Spring Security', icon: siSpringsecurity },
  { name: 'Hibernate', icon: siHibernate },
  { name: 'Angular', icon: siAngular },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'React', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'Python', icon: siPython },
  { name: 'FastAPI', icon: siFastapi },
  { name: 'Django', icon: siDjango },
  { name: 'Flask', icon: siFlask },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'PHP', icon: siPhp },
  { name: 'Laravel', icon: siLaravel },
  { name: 'Symfony', icon: siSymfony },
  { name: 'Kotlin', icon: siKotlin },
  { name: 'Flutter', icon: siFlutter },
  { name: 'Dart', icon: siDart },
  { name: 'GraphQL', icon: siGraphql },
];

const DATA_AND_DELIVERY: Tech[] = [
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'LangChain', icon: siLangchain },
  { name: 'TensorFlow', icon: siTensorflow },
  { name: 'Keras', icon: siKeras },
  { name: 'scikit-learn', icon: siScikitlearn },
  { name: 'pandas', icon: siPandas },
  { name: 'NumPy', icon: siNumpy },
  { name: 'OpenCV', icon: siOpencv },
  { name: 'Jupyter', icon: siJupyter },
  { name: 'MySQL', icon: siMysql },
  { name: 'MongoDB', icon: siMongodb },
  { name: 'Redis', icon: siRedis },
  { name: 'SQLite', icon: siSqlite },
  { name: 'Supabase', icon: siSupabase },
  { name: 'Apache Kafka', icon: siApachekafka },
  { name: 'Docker', icon: siDocker },
  { name: 'Nginx', icon: siNginx },
  { name: 'GitHub Actions', icon: siGithubactions },
  { name: 'Terraform', icon: siTerraform },
  { name: 'Git', icon: siGit },
  { name: 'GitHub', icon: siGithub },
  { name: 'JUnit 5', icon: siJunit5 },
  { name: 'Postman', icon: siPostman },
  { name: 'Swagger', icon: siSwagger },
  { name: 'JWT', icon: siJsonwebtokens },
  { name: 'Maven', icon: siApachemaven },
  { name: 'Gradle', icon: siGradle },
  { name: 'Vite', icon: siVite },
  { name: 'Jira', icon: siJira },
];

/**
 * Two rows of technology logos scrolling in opposite directions, like a chain.
 * Each row is rendered twice so the loop is seamless; the copy is hidden from screen
 * readers. Pauses on hover and focus; static and wrapped with reduced motion.
 */
@Component({
  selector: 'app-tech-marquee',
  templateUrl: './tech-marquee.html',
  styleUrl: './tech-marquee.scss',
})
export class TechMarqueeComponent {
  readonly rows = [
    { id: 'build', items: BUILD, reverse: false },
    { id: 'data', items: DATA_AND_DELIVERY, reverse: true },
  ];
}

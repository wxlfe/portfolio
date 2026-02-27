import Image from 'next/image';
import { Github, Linkedin, Mail } from 'lucide-react';
import { HomeHeroDetails } from '@/components/home-hero-details';

/**
 * Server-rendered hero content sourced from CMS data.
 */
type HomeHeroProps = {
  imageUrl?: string;
  title?: string;
  subtitle?: string;
};

/**
 * Renders the homepage hero with server-first content and deferred client details.
 */
export function HomeHero({ imageUrl, title, subtitle }: HomeHeroProps) {
  return (
    <section className="hero_panel">
      <div className="hero_copy">
        <div className="hero_section hero_section_intro">
          {imageUrl ? (
            <div className="hero_image_wrap">
              <Image
                className="hero_image"
                src={imageUrl}
                alt="Nate profile"
                width={544}
                height={544}
                priority
                fetchPriority="high"
                sizes="(max-width: 52rem) 224px, 272px"
              />
              <div className="hero_image_glow" aria-hidden="true" />
            </div>
          ) : null}
          <div className="hero_intro_text">
            <p className="hero_lead hero_line">
              <span className="hero_lead_primary">{title}</span>
              <span className="hero_lead_secondary">{subtitle}</span>
            </p>
            <div className="hero_contact_links">
              <a className="hero_contact_link" href="https://linkedin.com/in/wxlfe" target="_blank" rel="noreferrer" aria-label="Nate on LinkedIn">
                <Linkedin />
              </a>
              <a className="hero_contact_link" href="https://github.com/wxlfe" target="_blank" rel="noreferrer" aria-label="Nate on GitHub">
                <Github />
              </a>
              <a className="hero_contact_link" href="mailto:nate@wxlfe.dev" aria-label="Email Nate">
                <Mail />
              </a>
            </div>
          </div>
        </div>

        <div className="hero_section hero_section_pivot">
          <p className="hero_pivot">
            <span className="hero_pivot_text">But enough about me.</span>
            <span className="hero_pivot_underline" aria-hidden="true" />
          </p>
        </div>

        <div className="hero_section hero_section_details">
          <HomeHeroDetails />
        </div>

        <div className="hero_section hero_section_outro">
          <p className="hero_close hero_outro">
            <span className="hero_outro_text">Nice to meet you.</span>
            <span className="hero_outro_underline" aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
}

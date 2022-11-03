import { Button, Image, Link, Text } from '@nextui-org/react';
import { urlFor } from 'sanity';

const SkillPill = ({ skill }) => {
  return (
    <Link href={`/skills/${skill.slug.current}`} css={{ margin: '1rem' }}>
      <Button
        color='primary'
        auto
        rounded
        ghost
        icon={
          <Image
            src={urlFor(skill.skillIcon).url()}
            css={{
              objectFit: 'scale-down',
              maxHeight: '2rem',
              maxWidth: '2rem',
              minWidth: '2rem',
            }}
          />
        }
        href={`/skills/${skill.slug.current}`}
      >
        <Text b>{skill.title}</Text>
      </Button>
    </Link>
  );
};

export default SkillPill;

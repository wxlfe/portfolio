import Link from 'next/link';
import { Button, Image, Text } from '@nextui-org/react';
import { urlFor } from 'sanity';
import { SkillType } from 'utils/types';

type Props = {
  skill: SkillType;
};

const SkillPill = ({ skill }: Props) => {
  return (
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
      <Link href={`/skills/${skill.slug.current}`}>
        <Text b>{skill.title}</Text>
      </Link>
    </Button>
  );
};

export default SkillPill;

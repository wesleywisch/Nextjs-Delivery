import Link from "next/link";

import BackIcon from './backIcon.svg';

import { Container } from "./styles";

type HeaderProps = {
  backHref: string;
  color: string;
  title?: string;
  subTitle?: string;
}

export function Header({ backHref, color, title, subTitle }: HeaderProps) {
  return (
    <Container>
      <nav className="leftSide">
        <Link href={backHref}>
          <BackIcon color={color} />
        </Link>
      </nav>

      <div className="centerSide">
        {title && <h4 title={title} className="title">{title}</h4>}
        {subTitle && <span title={subTitle} className="subTitle">{subTitle}</span>}
      </div>

      <div className="rightSide">

      </div>
    </Container>
  )
}

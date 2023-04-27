import Link from "next/link";

import BackIcon from './backIcon.svg';

import { Container } from "./styles";

type HeaderProps = {
  backHref: string;
  color: string;
  title?: string;
  subTitle?: string;
  pageProductId?: boolean;
}

export function Header({ backHref, color, title, subTitle, pageProductId }: HeaderProps) {
  return (
    <Container>
      <nav className="leftSide">
        <Link
          href={backHref}
          className={pageProductId ? 'buttonTransparent' : ''}
        >
          <BackIcon color={pageProductId ? '#fff' : color} />
        </Link>
      </nav>

      <div className="centerSide">
        {title && (
          <h4
            style={{ color: pageProductId ? '#fff' : '#1b1b1b' }}
            title={title}
            className="title"
          >
            {title}
          </h4>
        )}
        {subTitle && <span title={subTitle} className="subTitle">{subTitle}</span>}
      </div>

      <div className="rightSide">

      </div>
    </Container>
  )
}

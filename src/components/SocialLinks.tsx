import React, { useContext } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookShareCount,
  RedditShareCount,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  LinkedinIcon,
  RedditIcon,
} from "react-share";
import urljoin from "url-join";
import { SiteConfig } from "../config";
import ConfigContext from "../context/ConfigContext";
import "./SocialLinks.css";

export const countFilter = (count: number): string =>
  count > 0 ? count.toString() : "";

export const generateRelatedTwitterNames = (
  config: SiteConfig
): Array<string> => {
  const relatedTwitterNames = [];
  if (config.user.twitterName)
    relatedTwitterNames.push(config.user.twitterName);

  if (config.website.twitterName)
    relatedTwitterNames.push(config.website.twitterName);

  return relatedTwitterNames;
};

type SocialLinksProps = {
  postSlug: string;
  mobile: boolean;
  postExcerpt?: string;
  postTitle: string;
};

const SocialLinks = ({
  postSlug,
  mobile,
  postExcerpt,
  postTitle,
}: SocialLinksProps): JSX.Element => {
  const config = useContext(ConfigContext);

  const url = urljoin(config.website.url, config.pathPrefix, postSlug);
  const iconSize = mobile ? 36 : 48;

  const renderShareCount = (count: number) => (
    <div className="share-count">{countFilter(count)}</div>
  );

  const relatedTwitterNames = generateRelatedTwitterNames(config);

  return (
    <div className="social-links">
      <RedditShareButton url={url} title={postTitle}>
        <RedditIcon round size={iconSize} />
        <RedditShareCount url={url}>
          {(count) => renderShareCount(count)}
        </RedditShareCount>
      </RedditShareButton>
      <TwitterShareButton
        url={url}
        title={postTitle}
        via={config.website.name}
        related={relatedTwitterNames}
      >
        <TwitterIcon round size={iconSize} />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={postExcerpt}>
        <FacebookIcon round size={iconSize} />
        <FacebookShareCount url={url}>
          {(count) => renderShareCount(count)}
        </FacebookShareCount>
      </FacebookShareButton>
      <LinkedinShareButton
        url={url}
        title={postTitle}
        summary={postExcerpt}
        source={config.website.name}
      >
        <LinkedinIcon round size={iconSize} />
      </LinkedinShareButton>
      <TelegramShareButton url={url} title={postTitle}>
        <TelegramIcon round size={iconSize} />
      </TelegramShareButton>
    </div>
  );
};

export default SocialLinks;

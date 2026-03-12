import type { ComponentType, SVGProps } from "react";
import {
  AwsIcon,
  NextjsIcon,
  ReactIcon,
  ShopifyIcon,
  TypescriptIcon,
  ViteIcon,
  VercelIcon,
  FigmaIcon,
  GoogleAdsIcon,
  MetaAdsIcon,
  HubspotIcon,
  ZohoIcon,
  AdobeIllustratorIcon,
  AdobePhotoshopIcon,
  AdobeIndesignIcon,
  AfterEffectsIcon,
  SplineIcon,
  TailwindCssIcon,
  FramerMotionIcon,
  NodeJsIcon,
  PostgresqlIcon,
  AppwriteIcon,
  SanityCmsIcon,
  SupabaseIcon,
  CloudflareIcon,
  DockerIcon,
  NetlifyIcon,
  RazorpayIcon,
  ResendIcon,
  GithubActionsIcon,
  GoogleAnalyticsIcon,
  UmamiIcon,
  HotjarIcon,
  PowerBiIcon,
  MailchimpIcon,
  SendgridIcon,
  MixpanelIcon,
  PaytmIcon,
  MicrosoftIcon,
} from "@/components/icons/BrandIcons";

type TrustStripTechLogoProps = {
  tech: string;
  className?: string;
  iconClassName?: string;
};

const TECH_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "NEXT.JS": NextjsIcon,
  VITE: ViteIcon,
  REACT: ReactIcon,
  VERCEL: VercelIcon,
  AWS: AwsIcon,
  SHOPIFY: ShopifyIcon,
  TYPESCRIPT: TypescriptIcon,
  FIGMA: FigmaIcon,
  "GOOGLE ADS": GoogleAdsIcon,
  "META ADS": MetaAdsIcon,
  HUBSPOT: HubspotIcon,
  ZOHO: ZohoIcon,
  "ADOBE ILLUSTRATOR": AdobeIllustratorIcon,
  "ADOBE PHOTOSHOP": AdobePhotoshopIcon,
  "ADOBE INDESIGN": AdobeIndesignIcon,
  "AFTER EFFECTS": AfterEffectsIcon,
  SPLINE: SplineIcon,
  "TAILWIND CSS": TailwindCssIcon,
  "FRAMER MOTION": FramerMotionIcon,
  "NODE.JS": NodeJsIcon,
  POSTGRESQL: PostgresqlIcon,
  APPWRITE: AppwriteIcon,
  "SANITY CMS": SanityCmsIcon,
  SUPABASE: SupabaseIcon,
  CLOUDFLARE: CloudflareIcon,
  DOCKER: DockerIcon,
  NETLIFY: NetlifyIcon,
  RAZORPAY: RazorpayIcon,
  RESEND: ResendIcon,
  "GITHUB ACTIONS": GithubActionsIcon,
  "GOOGLE ANALYTICS": GoogleAnalyticsIcon,
  "MICROSOFT CLARITY": MicrosoftIcon,
  UMAMI: UmamiIcon,
  HOTJAR: HotjarIcon,
  "POWER BI": PowerBiIcon,
  MAILCHIMP: MailchimpIcon,
  SENDGRID: SendgridIcon,
  MIXPANEL: MixpanelIcon,
  PAYTM: PaytmIcon,
};

export function TrustStripTechLogo({
  tech,
  className,
  iconClassName,
}: TrustStripTechLogoProps) {
  const Icon = TECH_ICONS[tech];
  if (!Icon) return null;

  return (
    <span className={className}>
      <Icon className={iconClassName} />
    </span>
  );
}


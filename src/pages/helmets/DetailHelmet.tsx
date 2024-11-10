import { Helmet } from "react-helmet-async";

interface IDetailHelmetProps {
  title: string;
}

export default function DetailHelmet({ title }: IDetailHelmetProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content="수수께끼를 해결하고 게시물 속 숨겨진 노트 내용을 확인하세요." />
      <meta property="og:title" content="리들노트" />
      <meta property="og:description" content="수수께끼를 해결하고 게시물 속 숨겨진 노트 내용을 확인하세요." />
      <meta property="og:url" content="https://riddlenote.com/" />
      <meta property="og:image" content="https://riddlenote.com/favicons/android-chrome-512x512.png" />
      <meta property="og:image:alt" content="리들노트 로고" />
      <meta name="twitter:title" content="리들노트" />
      <meta name="twitter:description" content="수수께끼를 해결하고 게시물 속 숨겨진 노트 내용을 확인하세요." />
      <meta name="twitter:image" content="https://riddlenote.com/favicons/android-chrome-512x512.png" />
      <meta name="twitter:image:alt" content="리들노트 로고" />
      <script type="application/ld+json">
        {`{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://riddlenote.com/#website",
          "url": "https://riddlenote.com/",
          "name": "리들노트",
          "description": "수수께끼를 해결하고 게시물 속 숨겨진 노트 내용을 확인하세요.",
          "inLanguage": "ko",
          "publisher": {
            "@type": "Organization",
            "name": "리들노트",
            "url": "https://riddlenote.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://riddlenote.com/favicons/android-chrome-512x512.png"
            }
          }
        }`}
      </script>
    </Helmet>
  ); 
}

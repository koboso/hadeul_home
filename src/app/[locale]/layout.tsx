import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { LocaleProvider } from "@/i18n/LocaleContext";
import LocaleHtmlLang from "./LocaleHtmlLang";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);

  return (
    <LocaleProvider locale={locale as Locale} dictionary={dictionary}>
      <LocaleHtmlLang locale={locale} />
      {children}
    </LocaleProvider>
  );
}

/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/pKEk9OJw8kW
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Arimo } from 'next/font/google'

arimo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
export function CookiesPageComponent() {
  const textContent = {
    title: "Cookie Policy",
    intro:
      "On this website, we use cookies to enhance your browsing experience and provide you with personalized content. This cookie policy explains what cookies are, the types of cookies we use, and how you can manage your cookie preferences.",
    sections: [
      {
        title: "What are Cookies?",
        description:
          "Cookies are small text files that are stored on your device when you visit a website. They help the website remember your preferences and actions, making your browsing experience more efficient and personalized.",
      },
      {
        title: "Types of Cookies We Use",
        items: [
          {
            title: "Necessary or Functionality Cookies",
            description:
              "These cookies are essential for the website to function properly. They enable you to navigate the site and access its features.",
          },
          {
            title: "Analytics Cookies",
            description:
              "These cookies help us understand how you use our website by collecting information about your browsing behavior. This allows us to improve the website and provide a better user experience.",
              optOut: 'opt out'
          },
        ],
      },
      {
        title: "Managing Your Cookie Preferences",
        description:
          "You can manage your cookie preferences by adjusting your browser settings. Most browsers allow you to accept or reject cookies, as well as set preferences for specific types of cookies. You can also use browser extensions or plugins to manage cookies.",
        note: "Please note that disabling certain cookies may affect the functionality of our website and the services we provide.",
      },
    ],
  }
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{textContent.title}</h1>
          <p className="mt-4 text-lg text-gray-500">{textContent.intro}</p>
        </div>
        <div className="space-y-6">
          {textContent.sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">{section.title}</h2>
              {section.description && <p className="mt-2 text-gray-500">{section.description}</p>}
              {section.items && (
                <ul className="mt-2 space-y-2 text-gray-500">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <strong className="font-medium text-gray-900">{item.title}:</strong> {item.description}
                    </li>
                  ))}
                </ul>
              )}
              {section.note && <p className="mt-2 text-gray-500">{section.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

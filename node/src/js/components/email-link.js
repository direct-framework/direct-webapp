/**
 * Build mailto links from obfuscated user/domain data attributes
 */

export default (() => {
  const links = document.querySelectorAll('[data-email-user][data-email-domain]')

  if (links.length === 0) return

  for (let i = 0; i < links.length; i++) {
    const link = links[i]
    const user = link.dataset.emailUser
    const domain = link.dataset.emailDomain

    if (!user || !domain) continue

    const email = `${user}@${domain}`
    link.href = `mailto:${email}`
  }
})()

export default class GitHubApi {
  TOKEN = import.meta.env.VITE_TOKEN
  API = 'https://api.github.com/users'

  constructor() {}

  async findUser(userId) {
    try {
      const response = await fetch(`${this.API}/${userId}`, {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()

      const date = new Date(result.created_at)

      const day = date.getUTCDate()
      const month = date.toLocaleString('en-US', { month: 'short' })
      const year = date.getUTCFullYear()
      const createdAt = `${day} ${month} ${year}`

      return {
        name: result.name,
        login: result.login,
        createdAt,
        avatarUrl: result.avatar_url,
        bio: result.bio,
        repositories: result.public_repos,
        followers: result.followers,
        following: result.following,
        location: result.location,
        twitterUsername: result.twitter_username,
        blog: result.blog,
        company: result.company,
      }
    } catch (error) {
      throw new Error(`${error.message} Something went wrong`)
    }
  }
}

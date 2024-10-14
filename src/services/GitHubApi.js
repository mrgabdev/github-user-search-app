export default class GitHubApi {
  TOKEN = import.meta.env.VITE_TOKEN
  API = 'https://api.github.com/users'

  constructor() {}

  async findUser(userId) {
    const response = await fetch(`${this.API}/${userId}`, {
      headers: {
        Authorization: `Bearer ${this.TOKEN}`,
      },
    })

    const result = await response.json()
    return {
      name: result.name,
      login: result.login,
      createdAt: result.created_at,
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
  }
}

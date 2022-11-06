import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { Octokit } from "octokit";
import { EnvironmentService } from '../configs';

const env = EnvironmentService.getAll();

const octokit = new Octokit({
  auth: env.github_token
});

@Injectable()
export class RepoService {
  public async findUserByUsername(username: string) {
    try {
      const user = await octokit.request(`GET /users/${username}/repos`, {
        headers: {
          "content-type": "text/plain",
        },
      });
      const userRepos = [];
      const repos = _.filter(user.data, (repo) => {
        return repo.fork === false;
      });
      for (let i = 0; i < repos.length; i++) {
        const repo = repos[i];
        // get repo branches
        const branches = await octokit.request(`GET /repos/${username}/${repo.name}/branches`, {
          headers: {
            "content-type": "text/plain",
          },
        });
        for (let j = 0; j < branches.data.length; j++) {
          const branch = branches.data[j];
          userRepos.push({
            name: repo.name,
            username: repo.owner.login,
            branch: branch.name,
            commit: branch.commit.sha
          });
        }
      }
      return userRepos;

    }
    catch (err) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not Found',
      }, 404);
    };
  }
}

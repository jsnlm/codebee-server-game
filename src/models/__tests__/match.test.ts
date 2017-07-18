import { setupTest } from '../../test/helper';
import { seedUsers } from '../../test/user.seed';
import { seedSubmissions } from '../../test/submission.seed';
import { seedMatch } from '../../test/match.seed';
import { User, UserClass, UserModel } from '../user';
import { Submission, SubmissionClass, SubmissionModel } from '../submission';
import { Match, MatchClass, MatchModel } from '../match';

let users: UserModel[];
let submissions: SubmissionModel[] = [];
let match1: MatchModel;
let match2: MatchModel;

beforeAll(async () => {
  await setupTest();``
  users = await seedUsers(2);
  submissions = submissions.concat(await seedSubmissions(2, users[0]));
  submissions = submissions.concat(await seedSubmissions(2, users[1]));
  match1 = await seedMatch(submissions);
  match2 = await seedMatch(submissions);
});

test('submission getter', async () => {
  expect((await match1.Submissions()).length).toEqual(4);
});

test('findBySubmission', async () => {
  expect((await Match.findBySubmission(submissions[0])).length).toEqual(2);
});

test('findByUser', async () => {
  expect((await Match.findByUser(users[0])).length).toEqual(2);
});
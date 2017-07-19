import logger from '../../env/debug';

import { setupTest } from '../../test/helper';
import { seedUsers } from '../../test/user.seed';
import { seedSubmissions, seedSubmission } from '../../test/submission.seed';
import { seedMatch } from '../../test/match.seed';
import { User, UserClass, UserModel } from '../user';
import { Submission, SubmissionClass, SubmissionModel } from '../submission';
import { Match, MatchClass, MatchModel } from '../match';

const debug = logger('match.test');

let users: UserModel[];
let submissions: SubmissionModel[] = [];
let match1: MatchModel;
let match2: MatchModel;
let match3: MatchModel;

beforeAll(async () => {
  await setupTest();
  users = await seedUsers(2);
  submissions = submissions.concat(await seedSubmissions(2, users[0]));
  submissions = submissions.concat(await seedSubmissions(2, users[1]));
  match1 = await seedMatch(submissions);
  match2 = await seedMatch(submissions);
});

test('MatchSubmission reference', async () => {
  let submission = await seedSubmission();
  let match4: MatchClass = new MatchClass();
  match4.addSubmission(submission);
  let matchModel3: MatchModel = await Match.create(match4);
  expect(matchModel3.submissions[0].submission._id).toEqual(submission._id);
});

test('submissions set properly', async () => {
  expect(match1.submissions.length).toEqual(4);
});

test('findBySubmission', async () => {
  expect((await Match.findBySubmission(submissions[0])).length).toEqual(2);
});

test('findByUser', async () => {
  expect((await Match.findByUser(users[0])).length).toEqual(2);
});
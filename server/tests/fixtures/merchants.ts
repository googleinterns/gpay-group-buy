/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const request = {
  name: 'Test Merchant',
  email: 'merchant@test.com',
  vpa: 'test@bank',
  firebaseUid: '5p8qqnmqX5hQKxxOl5yf3Jtr5fn2',
};

const authHeader =
  'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2MjNlMTBhMDQ1MTQwZjFjZmQ0YmUwNDY2Y2Y4MDM1MmI1OWY4MWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ3BheS1ncm91cC1idXkiLCJhdWQiOiJncGF5LWdyb3VwLWJ1eSIsImF1dGhfdGltZSI6MTU5NDEzODE0OSwidXNlcl9pZCI6IjVwOHFxbm1xWDVoUUt4eE9sNXlmM0p0cjVmbjIiLCJzdWIiOiI1cDhxcW5tcVg1aFFLeHhPbDV5ZjNKdHI1Zm4yIiwiaWF0IjoxNTk0MTM4MTQ5LCJleHAiOjE1OTQxNDE3NDksImVtYWlsIjoic2FtcGxlMzlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNhbXBsZTM5QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.QYK3X1xT__QEGY2OkmjXQDkV0hNwYJRXF5q4GB3oQwRuqPK2heJDQ9Zkmst03ykvF1VbsT9pdsAPhiAEujh-NCYy9fJ3KvkSRnCaKVhkWWQH8S3xU0aHiPrm5mSUShMa48XOP61hm-hyynmzNB2f_KrBWyfwRYnKA_t3F4CPRT2mHvMiRyN_8e2Ei6g1P5pirR66CWcBe403qZYnRYUmtb44Dv27ezTJiVbQZ0iFdjbbC6j-vLbrDR_HEx9kVJtZyMymt5X81KX3tJt4r3dcArRv5uEiKsGMbDdbSrq_LtEQ0-vA4yDmAWqswk3_PQt1cynBOEAyLcHe4-r3tIsNhQ';

export default {authHeader, request};

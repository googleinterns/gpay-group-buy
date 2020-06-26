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

import {addDays, subDays, addHours, differenceInCalendarDays} from 'date-fns';
import {formatDeadlineFromNowText} from 'utils/date';

describe('formatDeadlineFromNowText', () => {
  test('it should format deadline text accurately', () => {
    const now = new Date();
    const later = addHours(now, 1);
    const tomorrow = addDays(now, 2);
    const yesterday = subDays(now, 2);

    const dateInputs = [later, tomorrow, yesterday];
    const expectedValues = ['Last day!', '2 days left', 'Ended 2 days ago'];

    dateInputs.forEach((dateInput, idx) => {
      expect(formatDeadlineFromNowText(dateInput)).toBe(expectedValues[idx]);
    });
  });
});

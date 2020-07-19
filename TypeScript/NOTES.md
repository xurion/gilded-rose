# Notes

Here is a dumped list of notes/thoughts that may or may not be useful later.

-   Opted for the TypeScript version of the exercise.
-   Installed dependencies with yarn.
    -   Noticed there was no yarn.lock or package-lock.json file, so let's hope there's no issues with recent dependency versions.
    -   Added yarn.lock to the repo.
-   Quick peek at tests - there's only one :o
    -   Ran test and got the foo assertion failure. Fixed.
    -   Also renamed and modified the test. Tests == documentation!
-   Added .prettierrc to prevent it chewing up every line and destroying blame views per commit :/
    -   Note: prettier will eat empty lines at beginning/end of a block.
-   Checked coverage report from previous test run - as expected, a chunk of logic is not covered (less than 30% code branches executed).
    -   As a newcomer to this project, I will cover these first to improve confidence and prevent regressions.
-   Achieved coverage to 100% and 91% branches taken - some else branches not taken but these are not required as there are duplicate wrapped conditions. Committing first then will strip these.
-   Found possible bug with requirement: The Quality of an item is never more than 50
    -   The backstage pass is able to go from 49 to 51.
    -   Added test to confirm issue and fixed.

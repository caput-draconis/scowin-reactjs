Feature: Manage Details

    Scenario Outline: Add details to Database
        Given user is in "<page>" page
        And user clicks on "<button>"
        When user enters data of new "<option>"
        Then the data is added
        Examples:
            | page                     | button                | option            |
            | Manage Vaccination drive | Add Vaccination Drive | vaccination drive |
            | Manage Student Details   | Add New Student       | student           |
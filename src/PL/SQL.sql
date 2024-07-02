-- -- Create Client Table
-- CREATE TABLE Client (
--                         clientNo NUMBER PRIMARY KEY,
--                         clientName VARCHAR2(100),
--                         clientStreet VARCHAR2(100),
--                         clientCity VARCHAR2(50),
--                         clientState VARCHAR2(50),
--                         clientZipCode VARCHAR2(20)
-- );
--
-- -- Create Delegate Table
-- CREATE TABLE Delegate (
--                           delegateNo NUMBER PRIMARY KEY,
--                           delegateTitle VARCHAR2(10),
--                           delegateFName VARCHAR2(50),
--                           delegateLName VARCHAR2(50),
--                           delegateStreet VARCHAR2(100),
--                           delegateCity VARCHAR2(50),
--                           delegateState VARCHAR2(50),
--                           delegateZipCode VARCHAR2(20),
--                           attTelNo VARCHAR2(20),
--                           attFaxNo VARCHAR2(20),
--                           attEmailAddress VARCHAR2(100),
--                           clientNo NUMBER,
--                           FOREIGN KEY (clientNo) REFERENCES Client(clientNo)
-- );
--
-- -- Create Employee Table
-- CREATE TABLE Employee (
--                           employeeNo NUMBER PRIMARY KEY,
--                           employeeName VARCHAR2(100),
--                           employeePosition VARCHAR2(50)
-- );
--
-- -- Create Location Table
-- CREATE TABLE Location (
--                           locationNo NUMBER PRIMARY KEY,
--                           locationName VARCHAR2(100),
--                           maxSize NUMBER
-- );
--
-- -- Create CourseType Table
-- CREATE TABLE CourseType (
--                             courseTypeNo NUMBER PRIMARY KEY,
--                             courseTypeDescription VARCHAR2(100)
-- );
--
-- -- Create Course Table
-- CREATE TABLE Course (
--                         courseNo NUMBER PRIMARY KEY,
--                         courseName VARCHAR2(100),
--                         courseDescription VARCHAR2(500),
--                         startDate DATE,
--                         startTime VARCHAR2(10),
--                         endDate DATE,
--                         endTime VARCHAR2(10),
--                         maxDelegates NUMBER,
--                         confirmed CHAR(1),
--                         delivererEmployeeNo NUMBER,
--                         courseTypeNo NUMBER,
--                         FOREIGN KEY (delivererEmployeeNo) REFERENCES Employee(employeeNo),
--                         FOREIGN KEY (courseTypeNo) REFERENCES CourseType(courseTypeNo)
-- );
--
-- -- Create CourseFee Table
-- CREATE TABLE CourseFee (
--                            courseFeeNo NUMBER PRIMARY KEY,
--                            feeDescription VARCHAR2(100),
--                            fee NUMBER,
--                            courseNo NUMBER,
--                            FOREIGN KEY (courseNo) REFERENCES Course(courseNo)
-- );
--
-- -- Create Booking Table
-- CREATE TABLE Booking (
--                          bookingNo NUMBER PRIMARY KEY,
--                          bookingDate DATE,
--                          locationNo NUMBER,
--                          courseNo NUMBER,
--                          bookingEmployeeNo NUMBER,
--                          FOREIGN KEY (locationNo) REFERENCES Location(locationNo),
--                          FOREIGN KEY (courseNo) REFERENCES Course(courseNo),
--                          FOREIGN KEY (bookingEmployeeNo) REFERENCES Employee(employeeNo)
-- );
--
-- -- Create PaymentMethod Table
-- CREATE TABLE PaymentMethod (
--                                pMethodNo NUMBER PRIMARY KEY,
--                                pMethodName VARCHAR2(100)
-- );
--
-- -- Create Invoice Table
-- CREATE TABLE Invoice (
--                          invoiceNo NUMBER PRIMARY KEY,
--                          dateRaised DATE,
--                          datePaid DATE,
--                          creditCardNo VARCHAR2(20),
--                          holdersName VARCHAR2(100),
--                          expiryDate DATE,
--                          registrationNo NUMBER,
--                          pMethodNo NUMBER,
--                          FOREIGN KEY (registrationNo) REFERENCES Registration(registrationNo),
--                          FOREIGN KEY (pMethodNo) REFERENCES PaymentMethod(pMethodNo)
-- );
--
-- -- Create Registration Table
-- CREATE TABLE Registration (
--                               registrationNo NUMBER PRIMARY KEY,
--                               registrationDate DATE,
--                               delegateNo NUMBER,
--                               courseFeeNo NUMBER,
--                               registerEmployeeNo NUMBER,
--                               courseNo NUMBER,
--                               FOREIGN KEY (delegateNo) REFERENCES Delegate(delegateNo),
--                               FOREIGN KEY (courseFeeNo) REFERENCES CourseFee(courseFeeNo),
--                               FOREIGN KEY (registerEmployeeNo) REFERENCES Employee(employeeNo),
--                               FOREIGN KEY (courseNo) REFERENCES Course(courseNo)
-- );
--
-- -- Create UserLog Table (for logging activities)
-- CREATE TABLE UserLog (
--                          logId NUMBER PRIMARY KEY,
--                          logDate DATE,
--                          logUser VARCHAR2(100),
--                          logAction VARCHAR2(100)
-- );
--
-- -- Create Sequence for UserLog Table
-- CREATE SEQUENCE UserLog_seq
--     START WITH 1
--     INCREMENT BY 1;
--
--
--
--
--
--
-- CREATE OR REPLACE PROCEDURE insert_delegate (
--     p_delegateNo IN NUMBER,
--     p_delegateTitle IN VARCHAR2,
--     p_delegateFName IN VARCHAR2,
--     p_delegateLName IN VARCHAR2,
--     p_delegateStreet IN VARCHAR2,
--     p_delegateCity IN VARCHAR2,
--     p_delegateState IN VARCHAR2,
--     p_delegateZipCode IN VARCHAR2,
--     p_attTelNo IN VARCHAR2,
--     p_attFaxNo IN VARCHAR2,
--     p_attEmailAddress IN VARCHAR2,
--     p_clientNo IN NUMBER
-- ) AS
-- BEGIN
--     INSERT INTO Delegate (delegateNo, delegateTitle, delegateFName, delegateLName, delegateStreet, delegateCity, delegateState, delegateZipCode, attTelNo, attFaxNo, attEmailAddress, clientNo)
--     VALUES (p_delegateNo, p_delegateTitle, p_delegateFName, p_delegateLName, p_delegateStreet, p_delegateCity, p_delegateState, p_delegateZipCode, p_attTelNo, p_attFaxNo, p_attEmailAddress, p_clientNo);
-- EXCEPTION
--     WHEN OTHERS THEN
--         DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
-- END;
--
--
--
-- CREATE OR REPLACE PROCEDURE retrieve_delegate (
--     p_delegateNo IN NUMBER
-- ) AS
--     CURSOR delegate_cursor IS
--         SELECT * FROM Delegate WHERE delegateNo = p_delegateNo;
--     v_delegate Delegate%ROWTYPE;
-- BEGIN
--     OPEN delegate_cursor;
--     FETCH delegate_cursor INTO v_delegate;
--     IF delegate_cursor%FOUND THEN
--         DBMS_OUTPUT.PUT_LINE('Delegate Name: ' || v_delegate.delegateFName || ' ' || v_delegate.delegateLName);
--     ELSE
--         DBMS_OUTPUT.PUT_LINE('No delegate found with the given number.');
--     END IF;
--     CLOSE delegate_cursor;
-- EXCEPTION
--     WHEN OTHERS THEN
--         DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
-- END;
--
--
--
--
-- CREATE OR REPLACE PROCEDURE update_delegate (
--     p_delegateNo IN NUMBER,
--     p_delegateTitle IN VARCHAR2,
--     p_delegateFName IN VARCHAR2,
--     p_delegateLName IN VARCHAR2,
--     p_delegateStreet IN VARCHAR2,
--     p_delegateCity IN VARCHAR2,
--     p_delegateState IN VARCHAR2,
--     p_delegateZipCode IN VARCHAR2,
--     p_attTelNo IN VARCHAR2,
--     p_attFaxNo IN VARCHAR2,
--     p_attEmailAddress IN VARCHAR2,
--     p_clientNo IN NUMBER
-- ) AS
-- BEGIN
--     UPDATE Delegate
--     SET delegateTitle = p_delegateTitle,
--         delegateFName = p_delegateFName,
--         delegateLName = p_delegateLName,
--         delegateStreet = p_delegateStreet,
--         delegateCity = p_delegateCity,
--         delegateState = p_delegateState,
--         delegateZipCode = p_delegateZipCode,
--         attTelNo = p_attTelNo,
--         attFaxNo = p_attFaxNo,
--         attEmailAddress = p_attEmailAddress,
--         clientNo = p_clientNo
--     WHERE delegateNo = p_delegateNo;
-- EXCEPTION
--     WHEN OTHERS THEN
--         DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
-- END;
--
--
--
--
-- CREATE OR REPLACE PROCEDURE delete_delegate (
--     p_delegateNo IN NUMBER
-- ) AS
-- BEGIN
--     DELETE FROM Delegate WHERE delegateNo = p_delegateNo;
-- EXCEPTION
--     WHEN OTHERS THEN
--         DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
-- END;
--
--
--
--
-- CREATE OR REPLACE TRIGGER log_user_actions
--     AFTER INSERT OR UPDATE OR DELETE ON Delegate
--     FOR EACH ROW
-- BEGIN
--     INSERT INTO UserLog (logId, logDate, logUser, logAction)
--     VALUES (UserLog_seq.NEXTVAL, SYSDATE, USER, 'Performed an action on Delegate');
-- END;
--
--
--
--
-- -- used in the terminal
-- EXPDP system/(pass😂🙈😂) DIRECTORY=backup_dir DUMPFILE=backup.dmp LOGFILE=backup.log FULL=Y;
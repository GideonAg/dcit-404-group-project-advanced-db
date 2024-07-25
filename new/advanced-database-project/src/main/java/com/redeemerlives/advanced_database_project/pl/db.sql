CREATE TABLE employee (
                          employee_no NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                          first_name VARCHAR2(100),
                          last_name VARCHAR2(100),
                          position VARCHAR2(100)
);

CREATE TABLE location (
                          location_no NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                          location_name VARCHAR2(255),
                          max_size NUMBER
);

CREATE TABLE course (
                        course_no NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                        course_name VARCHAR2(255),
                        course_description VARCHAR2(500),
                        start_date DATE,
                        start_time DATE,
                        end_date DATE,
                        end_time DATE,
                        max_delegates NUMBER,
                        confirmed CHAR(1),
                        delivererEmployeeNo NUMBER,
                        courseTypeNo NUMBER,
                        FOREIGN KEY (delivererEmployeeNo) REFERENCES Employee(employee_no),
                        FOREIGN KEY (courseTypeNo) REFERENCES CourseType(course_type_no)
);

CREATE TABLE booking (
                         booking_no NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                         booking_date DATE,
                         location_no NUMBER,
                         courseNo NUMBER,
                         bookingEmployeeNo NUMBER,
                         FOREIGN KEY (location_no) REFERENCES Location(location_no),
                         FOREIGN KEY (courseNo) REFERENCES Course(course_no),
                         FOREIGN KEY (bookingEmployeeNo) REFERENCES Employee(employee_no)
);

CREATE TABLE course_fee (
                           course_fee_no NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                           fee_description VARCHAR2(255),
                           fee NUMBER(10,2),
                           course_no NUMBER,
                           FOREIGN KEY (course_no) REFERENCES Course(course_no)
);

CREATE TABLE CourseType (
                            course_type_no NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                            course_type_description VARCHAR2(255)
);

CREATE TABLE invoice (
                         invoice_no NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                         date_raised DATE,
                         date_paid DATE,
                         credit_card_no VARCHAR2(16),
                         holders_name VARCHAR2(100),
                         expiry_date VARCHAR2(5),
                         registration_no NUMBER,
                         pMethodNo NUMBER,
                         FOREIGN KEY (registration_no) REFERENCES Registration(registration_no),
                         FOREIGN KEY (pMethodNo) REFERENCES payment_method(p_method_no)
);


CREATE TABLE delegate (
                          delegate_no NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                          first_name VARCHAR2(100) NOT NULL,
                          last_name VARCHAR2(100) NOT NULL,
                          email VARCHAR2(255) NOT NULL UNIQUE,
                          phone_number VARCHAR2(15),
                          course_no NUMBER,
                          FOREIGN KEY (course_no) REFERENCES Course(course_no)
);

CREATE TABLE registration (
                              registration_no NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                              registration_date DATE,
                              delegate_no NUMBER,
                              course_fee_no NUMBER,
                              register_employee_no NUMBER,
                              courseNo NUMBER,
                              FOREIGN KEY (delegate_no) REFERENCES Delegate(delegate_no),
                              FOREIGN KEY (course_fee_no) REFERENCES course_fee(course_fee_no),
                              FOREIGN KEY (register_employee_no) REFERENCES Employee(employee_no),
                              FOREIGN KEY (courseNo) REFERENCES Course(course_no)
);

CREATE TABLE payment_method (
                               p_method_no NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                               method_name VARCHAR2(50),
                               description VARCHAR2(255)
);


CREATE TABLE employee_activity_log (
                                       log_id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                       operation_type VARCHAR2(10),
                                       employee_no NUMBER,
                                       first_name VARCHAR2(100),
                                       last_name VARCHAR2(100),
                                       operation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                       position VARCHAR2(100),
                                       performed_by VARCHAR2(100)
);


CREATE OR REPLACE TRIGGER trg_employee_activity
    AFTER INSERT OR DELETE ON employee
    FOR EACH ROW
BEGIN
    IF INSERTING THEN
        INSERT INTO employee_activity_log (
            operation_type, employee_no, first_name, last_name, position, performed_by
        ) VALUES (
                     'INSERT', :NEW.employee_no, :NEW.first_name, :NEW.last_name, :NEW.position, SYS_CONTEXT('USERENV', 'SESSION_USER')
                 );
    ELSIF DELETING THEN
        INSERT INTO employee_activity_log (
            operation_type, employee_no, first_name, last_name, position, performed_by
        ) VALUES (
                     'DELETE', :OLD.employee_no, :OLD.first_name, :OLD.last_name, :OLD.position, SYS_CONTEXT('USERENV', 'SESSION_USER')
                 );
    END IF;
END;
/


CREATE OR REPLACE TRIGGER trg_employee_update_activity
    AFTER UPDATE ON employee
    FOR EACH ROW
BEGIN
    INSERT INTO employee_activity_log (
        operation_type, employee_no, first_name, last_name, position, performed_by
    ) VALUES (
                 'UPDATE-OLD', :OLD.employee_no, :OLD.first_name, :OLD.last_name, :OLD.position, SYS_CONTEXT('USERENV', 'SESSION_USER')
             );

    INSERT INTO employee_activity_log (
        operation_type, employee_no, first_name, last_name, position, performed_by
    ) VALUES (
                 'UPDATE-NEW', :NEW.employee_no, :NEW.first_name, :NEW.last_name, :NEW.position, SYS_CONTEXT('USERENV', 'SESSION_USER')
             );
END;
/

CREATE OR REPLACE PROCEDURE create_course (
    p_course_name IN VARCHAR2,
    p_course_description IN VARCHAR2,
    p_start_date IN DATE,
    p_start_time IN DATE,
    p_end_date IN DATE,
    p_end_time IN DATE,
    p_max_delegates IN NUMBER,
    p_confirmed IN NUMBER,
    p_deliverer_employee_no IN NUMBER,
    p_course_type_no IN NUMBER
) AS
BEGIN
    INSERT INTO course (
        course_name, course_description, start_date, start_time,
        end_date, end_time, max_delegates, confirmed,
        delivererEmployeeNo, courseTypeNo
    ) VALUES (
                 p_course_name, p_course_description, p_start_date, p_start_time,
                 p_end_date, p_end_time, p_max_delegates, p_confirmed,
                 p_deliverer_employee_no, p_course_type_no
             );
END;
/


CREATE OR REPLACE PROCEDURE create_employee (
    p_first_name IN VARCHAR2,
    p_last_name IN VARCHAR2,
    p_position IN VARCHAR2
) AS
BEGIN
    INSERT INTO employee (first_name, last_name, position)
    VALUES (p_first_name, p_last_name, p_position);
END;
/

CREATE OR REPLACE PROCEDURE get_all_employees (
    p_cursor OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_cursor FOR
        SELECT employee_no, first_name, last_name, position
        FROM employee;
END;
/


CREATE OR REPLACE PROCEDURE delete_employee (
    p_employee_no IN NUMBER
) AS
    CURSOR c_employee IS
        SELECT employee_no
        FROM employee
        WHERE employee_no = p_employee_no;

    v_employee_no employee.employee_no%TYPE;
BEGIN
    OPEN c_employee;
    FETCH c_employee INTO v_employee_no;
    IF c_employee%FOUND THEN
        DELETE FROM employee
        WHERE employee_no = v_employee_no;
        COMMIT;
    ELSE
        DBMS_OUTPUT.PUT_LINE('Employee not found.');
    END IF;
    CLOSE c_employee;
END;
/


CREATE OR REPLACE PROCEDURE get_employee (
    p_employee_no IN NUMBER,
    p_cursor OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_cursor FOR
        SELECT employee_no, first_name, last_name, position
        FROM employee
        WHERE employee_no = p_employee_no;
END;
/

CREATE OR REPLACE PROCEDURE update_employee (
    p_employee_no IN NUMBER,
    p_first_name IN VARCHAR2,
    p_last_name IN VARCHAR2,
    p_position IN VARCHAR2
) AS
BEGIN
    UPDATE employee
    SET first_name = p_first_name,
        last_name = p_last_name,
        position = p_position
    WHERE employee_no = p_employee_no;
END;
/


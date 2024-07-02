import javax.swing.*;
import java.sql.CallableStatement;
import java.sql.SQLException;

class InsertPanel extends JFrame {
    public InsertPanel() {
        setTitle("Insert Record");
        setSize(400, 600);
        setLayout(new BoxLayout(getContentPane(), BoxLayout.Y_AXIS));

        JTextField delegateNoField = new JTextField();
        JTextField delegateTitleField = new JTextField();
        JTextField delegateFNameField = new JTextField();
        JTextField delegateLNameField = new JTextField();
        JTextField delegateStreetField = new JTextField();
        JTextField delegateCityField = new JTextField();
        JTextField delegateStateField = new JTextField();
        JTextField delegateZipCodeField = new JTextField();
        JTextField attTelNoField = new JTextField();
        JTextField attFaxNoField = new JTextField();
        JTextField attEmailAddressField = new JTextField();
        JTextField clientNoField = new JTextField();

        JButton insertButton = new JButton("Insert");

        add(new JLabel("Delegate No:"));
        add(delegateNoField);
        add(new JLabel("Title:"));
        add(delegateTitleField);
        add(new JLabel("First Name:"));
        add(delegateFNameField);
        add(new JLabel("Last Name:"));
        add(delegateLNameField);
        add(new JLabel("Street:"));
        add(delegateStreetField);
        add(new JLabel("City:"));
        add(delegateCityField);
        add(new JLabel("State:"));
        add(delegateStateField);
        add(new JLabel("Zip Code:"));
        add(delegateZipCodeField);
        add(new JLabel("Tel No:"));
        add(attTelNoField);
        add(new JLabel("Fax No:"));
        add(attFaxNoField);
        add(new JLabel("Email Address:"));
        add(attEmailAddressField);
        add(new JLabel("Client No:"));
        add(clientNoField);
        add(insertButton);

        insertButton.addActionListener(e -> {
            try {
                CallableStatement stmt = TrainingCompanyApp.con.prepareCall("{call insert_delegate(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
                stmt.setInt(1, Integer.parseInt(delegateNoField.getText()));
                stmt.setString(2, delegateTitleField.getText());
                stmt.setString(3, delegateFNameField.getText());
                stmt.setString(4, delegateLNameField.getText());
                stmt.setString(5, delegateStreetField.getText());
                stmt.setString(6, delegateCityField.getText());
                stmt.setString(7, delegateStateField.getText());
                stmt.setString(8, delegateZipCodeField.getText());
                stmt.setString(9, attTelNoField.getText());
                stmt.setString(10, attFaxNoField.getText());
                stmt.setString(11, attEmailAddressField.getText());
                stmt.setInt(12, Integer.parseInt(clientNoField.getText()));
                stmt.execute();
                JOptionPane.showMessageDialog(this, "Record inserted successfully.");
            } catch (SQLException ex) {
                ex.printStackTrace();
                JOptionPane.showMessageDialog(this, "Error inserting record.");
            }
        });

        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setVisible(true);
    }
}

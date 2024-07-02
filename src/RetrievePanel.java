import javax.swing.*;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

class RetrievePanel extends JFrame {
    public RetrievePanel() {
        setTitle("Retrieve Record");
        setSize(400, 200);
        setLayout(new BoxLayout(getContentPane(), BoxLayout.Y_AXIS));

        JTextField delegateNoField = new JTextField();
        JButton retrieveButton = new JButton("Retrieve");

        add(new JLabel("Delegate No:"));
        add(delegateNoField);
        add(retrieveButton);

        retrieveButton.addActionListener(e -> {
            try {
                CallableStatement stmt = TrainingCompanyApp.con.prepareCall("{call retrieve_delegate(?)}");
                stmt.setInt(1, Integer.parseInt(delegateNoField.getText()));
                ResultSet rs = stmt.executeQuery();
                if (rs.next()) {
                    JOptionPane.showMessageDialog(this, "Delegate: " + rs.getString("delegateFName") + " " + rs.getString("delegateLName"));
                } else {
                    JOptionPane.showMessageDialog(this, "No delegate found.");
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
                JOptionPane.showMessageDialog(this, "Error retrieving record.");
            }
        });

        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setVisible(true);
    }
}

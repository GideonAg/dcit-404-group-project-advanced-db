import javax.swing.*;
import java.sql.CallableStatement;
import java.sql.SQLException;

class DeletePanel extends JFrame {
    public DeletePanel() {
        setTitle("Delete Record");
        setSize(400, 200);
        setLayout(new BoxLayout(getContentPane(), BoxLayout.Y_AXIS));

        JTextField delegateNoField = new JTextField();
        JButton deleteButton = new JButton("Delete");

        add(new JLabel("Delegate No:"));
        add(delegateNoField);
        add(deleteButton);

        deleteButton.addActionListener(e -> {
            try {
                CallableStatement stmt = TrainingCompanyApp.con.prepareCall("{call delete_delegate(?)}");
                stmt.setInt(1, Integer.parseInt(delegateNoField.getText()));
                stmt.execute();
                JOptionPane.showMessageDialog(this, "Record deleted successfully.");
            } catch (SQLException ex) {
                ex.printStackTrace();
                JOptionPane.showMessageDialog(this, "Error deleting record.");
            }
        });

        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setVisible(true);
    }
}

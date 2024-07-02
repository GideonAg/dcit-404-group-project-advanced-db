import javax.swing.*;
import java.awt.*;
import java.sql.*;

public class TrainingCompanyApp extends JFrame {
    private static final String url = "jdbc:oracle:thin:@localhost:1521:orcl";
    private static final String user = "hr";
    private static final String password = "hr_password";
    public static Connection con;

    public TrainingCompanyApp() {
        setTitle("Training Company Database");
        setSize(400, 300);
        setLayout(new GridLayout(5, 1));

        JButton insertButton = new JButton("Insert Record");
        JButton retrieveButton = new JButton("Retrieve Record");
        JButton updateButton = new JButton("Update Record");
        JButton deleteButton = new JButton("Delete Record");
        JButton backupButton = new JButton("Backup");

        insertButton.addActionListener(e -> showInsertPanel());
        retrieveButton.addActionListener(e -> showRetrievePanel());
        updateButton.addActionListener(e -> showUpdatePanel());
        deleteButton.addActionListener(e -> showDeletePanel());
        backupButton.addActionListener(e -> backupDatabase());

        add(insertButton);
        add(retrieveButton);
        add(updateButton);
        add(deleteButton);
        add(backupButton);

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
    }

    private void showInsertPanel() {
        new InsertPanel();
    }

    private void showRetrievePanel() {
        new RetrievePanel();
    }

    private void showUpdatePanel() {
        new UpdatePanel();
    }

    private void showDeletePanel() {
        new DeletePanel();
    }

    private void backupDatabase() {
        try {
            Statement stmt = con.createStatement();
            stmt.execute("EXPDP system/password DIRECTORY=backup_dir DUMPFILE=backup.dmp LOGFILE=backup.log FULL=YES");
            JOptionPane.showMessageDialog(this, "Database backup completed.");
        } catch (SQLException ex) {
            ex.printStackTrace();
            JOptionPane.showMessageDialog(this, "Error backing up database.");
        }
    }

    public static void main(String[] args) {
            new TrainingCompanyApp();
//        try {
//            con = DriverManager.getConnection(url, user, password);
//            new TrainingCompanyApp();
//        } catch (SQLException sqlEx) {
//            sqlEx.printStackTrace();
//        }
    }
}

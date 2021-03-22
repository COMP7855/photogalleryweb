import javax.servlet.http.*;
import javax.servlet.*;
import java.io.*;
public class RenameServlet extends HttpServlet {
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
      response.setContentType("text/html");
      PrintWriter out = response.getWriter();
      if(renameFile("C:/tomcat/webapps/photogalleryweb/images/", "a.jpg", "yoda.jpg"))
      {
         out.println("File rename successful");
      }
      else
      {
         out.println("File rename failed");
      }  
  }

  private boolean renameFile(String path, String oldName, String newName) 
  {
     // variable to return for function success
     boolean success;
     
     // File (or directory) with old name
      File file = new File(path + oldName);

      // File (or directory) with new name
      File file2 = new File(path + newName);

      if (file2.exists())
      {
         // File 2 already exists
         success = false;
      }
      else
      {
         // Rename file (or directory)
         success = file.renameTo(file2);
      }

      return success;
  }
}

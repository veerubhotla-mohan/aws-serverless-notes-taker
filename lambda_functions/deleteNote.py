import os
import boto3
dynamodb = boto3.resource('dynamodb')

notesTable = dynamodb.Table(os.environ['dynamodbTable'])


def lambda_handler(event, context):
    notesTable.delete_item(Key={"username": event["username"],
                                "creation_timestamp": event["creation_timestamp"]})

    return {
        'statusCode': 200,
    }
